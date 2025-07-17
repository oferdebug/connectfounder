'use client';

import { useEffect, useCallback } from 'react';

interface ShortcutHandler {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  handler: () => void;
}

export function useKeyboardShortcuts(shortcuts: ShortcutHandler[]) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      shortcuts.forEach(({ key, ctrl, alt, shift, handler }) => {
        if (
          event.key.toLowerCase() === key.toLowerCase() &&
          (!ctrl || event.ctrlKey) &&
          (!alt || event.altKey) &&
          (!shift || event.shiftKey)
        ) {
          event.preventDefault();
          handler();
        }
      });
    },
    [shortcuts]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
