import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Sparkles, CheckCircle2, Package, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'match':
        return <Sparkles className="w-4 h-4 text-emerald-400" />;
      case 'booking':
        return <Package className="w-4 h-4 text-cyan-400" />;
      case 'verification':
        return <CheckCircle2 className="w-4 h-4 text-purple-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-50"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-slate-200 z-50 p-6 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-extrabold text-slate-900">AI Control Room Alerts</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {notifications.length === 0 ? (
                <div className="text-center text-slate-400 py-12 text-sm font-medium">No new notifications</div>
              ) : (
                notifications.map(item => (
                  <div
                    key={item.id}
                    onClick={() => markNotificationAsRead(item.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      item.read
                        ? 'bg-slate-50 border-slate-200 text-slate-500'
                        : 'bg-emerald-50/60 border-emerald-200 text-slate-900 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-white border border-slate-200 mt-0.5 shadow-2xs">
                        {getIcon(item.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-extrabold text-slate-900">{item.title}</h4>
                          <span className="text-[10px] text-slate-400 font-semibold">{item.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.message}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
