'use client';

import {
  // Import commonly used icons from Lucide React
  Home,
  Users,
  MessageCircle,
  Calendar,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Check,
  AlertCircle,
  Info,
  ExternalLink,
  Mail,
  Lock,
  Eye,
  EyeOff,
  type Icon as LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the props type for our Icon component
export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  size?: number;
  className?: string;
}

// Map of icon names to their components
const iconMap: { [key: string]: LucideIcon } = {
  home: Home,
  users: Users,
  message: MessageCircle,
  calendar: Calendar,
  settings: Settings,
  logout: LogOut,
  bell: Bell,
  search: Search,
  plus: Plus,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  menu: Menu,
  close: X,
  check: Check,
  alert: AlertCircle,
  info: Info,
  external: ExternalLink,
  mail: Mail,
  lock: Lock,
  eye: Eye,
  eyeOff: EyeOff,
};

// Icon component that renders the appropriate icon based on name prop
export function Icon({ name, size = 24, className, ...props }: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <div {...props} className={cn('inline-flex', className)}>
      <IconComponent size={size} />
    </div>
  );
}

// Logo component that renders the FounderConnect logo
export function Logo({ className, ...props }: Omit<IconProps, 'name'>) {
  return (
    <div {...props} className={cn('relative', className)}>
      <img src="/icons/logo.svg" alt="FounderConnect Logo" width={32} height={32} />
    </div>
  );
}

// NetworkIcon component for network-related icons
export function NetworkIcon({ className, ...props }: Omit<IconProps, 'name'>) {
  return (
    <div {...props} className={cn('relative', className)}>
      <img src="/icons/network.svg" alt="Network" width={24} height={24} />
    </div>
  );
}

// ConnectIcon component for connection-related icons
export function ConnectIcon({ className, ...props }: Omit<IconProps, 'name'>) {
  return (
    <div {...props} className={cn('relative', className)}>
      <img src="/icons/connect.svg" alt="Connect" width={24} height={24} />
    </div>
  );
}

// EventIcon component for event-related icons
export function EventIcon({ className, ...props }: Omit<IconProps, 'name'>) {
  return (
    <div {...props} className={cn('relative', className)}>
      <img src="/icons/calendar.svg" alt="Event" width={24} height={24} />
    </div>
  );
}
