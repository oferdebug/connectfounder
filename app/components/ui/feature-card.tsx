'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

export function FeatureCard({ icon, title, description, className, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10
        }
      }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={cn(
        'text-center p-6 bg-white rounded-2xl shadow-xl border border-gray-100 cursor-pointer',
        className
      )}
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        whileHover={{ 
          scale: 1.2,
          rotate: [0, -10, 10, -10, 0],
          transition: {
            scale: {
              type: "spring",
              stiffness: 400,
              damping: 10
            },
            rotate: {
              duration: 0.5,
              ease: "easeInOut"
            }
          }
        }}
        transition={{
          duration: 0.5,
          delay: delay + 0.1,
          ease: [0.175, 0.885, 0.32, 1.275],
        }}
        className="h-12 w-12 mx-auto mb-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center"
      >
        {icon}
      </motion.div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
