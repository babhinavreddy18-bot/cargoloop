import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glow = false,
  hoverEffect = false,
  onClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={clsx(
        'rounded-2xl p-5 relative overflow-hidden transition-all duration-300',
        glow ? 'glass-panel-glow' : 'glass-panel',
        hoverEffect && 'glass-card-hover cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
};
