export type NotificationType = 'connection' | 'message' | 'event' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  createdAt: string;
  read: boolean;
  data?: Record<string, any>;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  types: {
    connection: boolean;
    message: boolean;
    event: boolean;
    system: boolean;
  };
}
