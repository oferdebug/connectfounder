'use client';

import { useState } from 'react';
import { Icon } from '../ui/icons';

interface ShortcutInfo {
  key: string;
  description: string;
  modifier?: 'ctrl' | 'alt' | 'shift';
}

interface KeyboardShortcutsHelpProps {
  shortcuts: ShortcutInfo[];
}

export function KeyboardShortcutsHelp({ shortcuts }: KeyboardShortcutsHelpProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-50"
        title="Keyboard Shortcuts"
      >
        <Icon name="keyboard" size={20} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Keyboard Shortcuts
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {shortcuts.map(({ key, description, modifier }) => (
                <div
                  key={`${modifier || ''}-${key}`}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-gray-600">{description}</span>
                  <div className="flex items-center gap-1">
                    {modifier && (
                      <>
                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded">
                          {modifier.toUpperCase()}
                        </kbd>
                        <span className="text-gray-500">+</span>
                      </>
                    )}
                    <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded">
                      {key.toUpperCase()}
                    </kbd>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-xs text-gray-500">
              Press <kbd className="px-1 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded">?</kbd> to show/hide this help
            </div>
          </div>
        </div>
      )}
    </>
  );
}
