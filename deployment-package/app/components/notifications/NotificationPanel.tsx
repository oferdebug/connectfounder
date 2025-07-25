'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import { Icon } from '../ui/icons';
import { Badge } from '../ui/Badge';
import Link from 'next/link';
import type { Notification } from '@/types/notifications';

function NotificationIcon({ type }: { type: Notification['type'] }) {
  const iconMap = {
    connection: 'users',
    message: 'message',
    event: 'calendar',
    system: 'bell',
  };

  return <Icon name={iconMap[type]} size={16} />;
}

export function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { state, markAsRead, markAllAsRead, removeNotification } = useNotifications();
  const { notifications, unreadCount } = state;

  const togglePanel = () => setIsOpen(!isOpen);

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={togglePanel}
        className="relative p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
      >
        <Icon name="bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex h-5 w-5">
            <Badge variant="error" className="absolute animate-pulse">
              {unreadCount}
            </Badge>
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No notifications yet
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`p-4 ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex-shrink-0 rounded-full p-2 ${
                              !notification.read
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            <NotificationIcon type={notification.type} />
                          </div>
                          <div className="flex-1 min-w-0">
                            {notification.link ? (
                              <Link
                                href={notification.link}
                                onClick={() =>
                                  handleNotificationClick(notification)
                                }
                                className="block"
                              >
                                <h4 className="text-sm font-medium text-gray-900">
                                  {notification.title}
                                </h4>
                                <p className="mt-1 text-sm text-gray-500">
                                  {notification.message}
                                </p>
                              </Link>
                            ) : (
                              <div
                                onClick={() =>
                                  handleNotificationClick(notification)
                                }
                              >
                                <h4 className="text-sm font-medium text-gray-900">
                                  {notification.title}
                                </h4>
                                <p className="mt-1 text-sm text-gray-500">
                                  {notification.message}
                                </p>
                              </div>
                            )}
                            <p className="mt-1 text-xs text-gray-400">
                              {new Date(
                                notification.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600"
                          >
                            <Icon name="x" size={14} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
