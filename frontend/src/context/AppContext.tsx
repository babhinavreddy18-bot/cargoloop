import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, UserRole, Truck, Shipment, Booking, 
  DriverDocument, AIMatch, FutureTruckPrediction, NotificationItem 
} from '../types';
import { 
  MOCK_USERS, MOCK_TRUCKS, MOCK_SHIPMENTS, MOCK_FUTURE_PREDICTIONS, 
  MOCK_AI_MATCHES, MOCK_DRIVER_DOCUMENTS, MOCK_NOTIFICATIONS 
} from '../lib/mockData';
import { matchReturnLoadsWithGemini, getAIFutureTruckPredictions } from '../lib/gemini';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserProfile;
  trucks: Truck[];
  shipments: Shipment[];
  bookings: Booking[];
  documents: DriverDocument[];
  predictions: FutureTruckPrediction[];
  aiMatches: AIMatch[];
  notifications: NotificationItem[];
  aiThinking: boolean;
  
  // Actions
  addTruck: (newTruck: Omit<Truck, 'id' | 'created_at'>) => void;
  addShipment: (newShipment: Omit<Shipment, 'id' | 'created_at' | 'status'>) => void;
  createBooking: (shipmentId: string, truckId: string, cost: number, isAdvance?: boolean) => void;
  addDocument: (doc: Omit<DriverDocument, 'id' | 'uploaded_at'>) => void;
  runAIMatchingForTruck: (truckId: string) => Promise<AIMatch[]>;
  reserveFutureTruck: (predictionId: string) => void;
  markNotificationAsRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('driver');
  const [currentUser, setCurrentUser] = useState<UserProfile>(MOCK_USERS[0]);
  
  const [trucks, setTrucks] = useState<Truck[]>(MOCK_TRUCKS);
  const [shipments, setShipments] = useState<Shipment[]>(MOCK_SHIPMENTS);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [documents, setDocuments] = useState<DriverDocument[]>(MOCK_DRIVER_DOCUMENTS);
  const [predictions, setPredictions] = useState<FutureTruckPrediction[]>(MOCK_FUTURE_PREDICTIONS);
  const [aiMatches, setAiMatches] = useState<AIMatch[]>(MOCK_AI_MATCHES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [aiThinking, setAiThinking] = useState<boolean>(false);

  // Sync user object when role changes
  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    const foundUser = MOCK_USERS.find(u => u.role === newRole) || MOCK_USERS[0];
    setCurrentUser(foundUser);
  };

  // Add new truck
  const addTruck = (truckData: Omit<Truck, 'id' | 'created_at'>) => {
    const newTruck: Truck = {
      ...truckData,
      id: `trk-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setTrucks(prev => [newTruck, ...prev]);

    // Push notification
    addNotificationItem(
      '🚚 New Truck Registered',
      `Truck ${newTruck.truck_number} (${newTruck.truck_type}) registered in ${newTruck.current_city}.`,
      'system'
    );
  };

  // Add new shipment
  const addShipment = (shipmentData: Omit<Shipment, 'id' | 'created_at' | 'status'>) => {
    const newShipment: Shipment = {
      ...shipmentData,
      id: `shp-${Date.now()}`,
      status: 'open',
      created_at: new Date().toISOString()
    };
    setShipments(prev => [newShipment, ...prev]);

    addNotificationItem(
      '📦 Shipment Posted',
      `New return shipment posted: ${newShipment.pickup_city} to ${newShipment.drop_city} (₹${newShipment.offered_price.toLocaleString()}).`,
      'match'
    );

    // Trigger AI match check
    if (trucks.length > 0) {
      runAIMatchingForTruck(trucks[0].id);
    }
  };

  // Create booking
  const createBooking = (shipmentId: string, truckId: string, cost: number, isAdvance = false) => {
    const shipment = shipments.find(s => s.id === shipmentId);
    const truck = trucks.find(t => t.id === truckId);

    const newBooking: Booking = {
      id: `bkg-${Date.now()}`,
      shipment_id: shipmentId,
      truck_id: truckId,
      driver_id: truck?.driver_id || currentUser.id,
      shipper_id: shipment?.shipper_id || currentUser.id,
      agreed_freight_cost: cost,
      is_advance_reservation: isAdvance,
      status: 'confirmed',
      created_at: new Date().toISOString(),
      shipment,
      truck
    };

    setBookings(prev => [newBooking, ...prev]);

    // Update shipment status
    setShipments(prev => prev.map(s => s.id === shipmentId ? { ...s, status: 'reserved' } : s));

    // Update truck status
    setTrucks(prev => prev.map(t => t.id === truckId ? { ...t, status: 'in_transit' } : t));

    addNotificationItem(
      isAdvance ? '⚡ Advance Truck Reservation Confirmed' : '🎉 Return Load Booking Confirmed',
      `Freight agreed at ₹${cost.toLocaleString()}. Truck ${truck?.truck_number || ''} assigned.`,
      'booking'
    );
  };

  // Add document & recalculate driver trust score
  const addDocument = (doc: Omit<DriverDocument, 'id' | 'uploaded_at'>) => {
    const newDoc: DriverDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      uploaded_at: new Date().toISOString()
    };
    setDocuments(prev => [newDoc, ...prev]);

    // Upgrade trust score if verified
    if (doc.verification_status === 'verified') {
      setCurrentUser(prev => ({
        ...prev,
        trust_score: Math.min(100, prev.trust_score + (doc.ai_verification_summary?.trust_delta || 15)),
        is_verified: true
      }));

      addNotificationItem(
        '✅ Driver Verification Successful',
        `Gemini AI verified ${doc.document_type.toUpperCase()}. Trust score increased!`,
        'verification'
      );
    }
  };

  // Run Gemini AI matching
  const runAIMatchingForTruck = async (truckId: string): Promise<AIMatch[]> => {
    const targetTruck = trucks.find(t => t.id === truckId) || trucks[0];
    const openLoads = shipments.filter(s => s.status === 'open');
    
    if (!targetTruck || openLoads.length === 0) return aiMatches;

    setAiThinking(true);
    try {
      const matches = await matchReturnLoadsWithGemini(targetTruck, openLoads);
      setAiMatches(matches);
      return matches;
    } finally {
      setAiThinking(false);
    }
  };

  // Reserve Future Truck Prediction
  const reserveFutureTruck = (predictionId: string) => {
    const pred = predictions.find(p => p.id === predictionId);
    if (!pred) return;

    setPredictions(prev => prev.filter(p => p.id !== predictionId));

    addNotificationItem(
      '🌟 Future Truck Reserved in Advance',
      `Advance reservation locked for truck ${pred.truck_number} arriving in ${pred.target_destination_city} at ${new Date(pred.predicted_available_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
      'booking'
    );
  };

  const addNotificationItem = (title: string, message: string, type: NotificationItem['type']) => {
    const item: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      type,
      read: false
    };
    setNotifications(prev => [item, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        trucks,
        shipments,
        bookings,
        documents,
        predictions,
        aiMatches,
        notifications,
        aiThinking,
        addTruck,
        addShipment,
        createBooking,
        addDocument,
        runAIMatchingForTruck,
        reserveFutureTruck,
        markNotificationAsRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
