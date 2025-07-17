'use client';

import { useNotifications } from '../../context/NotificationContext';
import type { NotificationPreferences } from '../../types/notifications';
import { Switch } from '../ui/switch';

export function NotificationSettings() {
  const { state, updatePreferences } = useNotifications();
  const { preferences } = state;

  const handleToggle = (
    category: keyof NotificationPreferences | keyof NotificationPreferences['types'],
    section: 'main' | 'types',
    value: boolean
  ) => {
    if (section === 'main') {
      updatePreferences({
        ...preferences,
        [category]: value,
      });
    } else {
      updatePreferences({
        ...preferences,
        types: {
          ...preferences.types,
          [category]: value,
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">
          Notification Settings
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Choose how you want to receive notifications
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Email</h4>
            <p className="text-sm text-gray-500">
              Receive notifications via email
            </p>
          </div>
          <Switch
            checked={preferences.email}
            onCheckedChange={(checked) => handleToggle('email', 'main', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Push</h4>
            <p className="text-sm text-gray-500">
              Receive push notifications in browser
            </p>
          </div>
          <Switch
            checked={preferences.push}
            onCheckedChange={(checked) => handleToggle('push', 'main', checked)}
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-4">
          Notification Types
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-gray-900">Connections</h5>
              <p className="text-sm text-gray-500">
                When someone connects with you
              </p>
            </div>
            <Switch
              checked={preferences.types.connection}
              onCheckedChange={(checked) =>
                handleToggle('connection', 'types', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-gray-900">Messages</h5>
              <p className="text-sm text-gray-500">When you receive a message</p>
            </div>
            <Switch
              checked={preferences.types.message}
              onCheckedChange={(checked) =>
                handleToggle('message', 'types', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-gray-900">Events</h5>
              <p className="text-sm text-gray-500">
                Updates about events you're interested in
              </p>
            </div>
            <Switch
              checked={preferences.types.event}
              onCheckedChange={(checked) => handleToggle('event', 'types', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-gray-900">System</h5>
              <p className="text-sm text-gray-500">
                Important system notifications
              </p>
            </div>
            <Switch
              checked={preferences.types.system}
              onCheckedChange={(checked) =>
                handleToggle('system', 'types', checked)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
