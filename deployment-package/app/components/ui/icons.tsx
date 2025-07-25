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
  Globe,
  Share2,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
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
  globe: Globe,
  share: Share2,
  book: BookOpen,
};

// Icon component that renders the appropriate icon based on name prop
export function Icon({ name, size = 24, className, ...props }: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <div {...props} className={cn("inline-flex", className)}>
      <IconComponent size={size} />
    </div>
  );
}

// Feature icons with gradients
export function GlobalNetworkIcon({
  className,
  ...props
}: Omit<IconProps, "name">) {
  return (
    <div {...props} className={cn("relative text-blue-600", className)}>
      <Globe className="w-full h-full stroke-2" />
    </div>
  );
}

export function EventsIcon({ className, ...props }: Omit<IconProps, "name">) {
  return (
    <div {...props} className={cn("relative text-green-600", className)}>
      <Calendar className="w-full h-full stroke-2" />
    </div>
  );
}

export function ResourcesIcon({
  className,
  ...props
}: Omit<IconProps, "name">) {
  return (
    <div {...props} className={cn("relative text-purple-600", className)}>
      <BookOpen className="w-full h-full stroke-2" />
    </div>
  );
}

// Logo component that renders the FounderConnect logo
export function Logo({ className, ...props }: Omit<IconProps, 'name'>) {
  return (
    <div {...props} className={cn("relative", className)}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="120" height="120" rx="24" fill="url(#gradient)" />
        <path
          d="M40 50C40 44.4772 44.4772 40 50 40H70C75.5228 40 80 44.4772 80 50V70C80 75.5228 75.5228 80 70 80H50C44.4772 80 40 75.5228 40 70V50Z"
          stroke="white"
          strokeWidth="4"
        />
        <path
          d="M53 60H67M60 53V67"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="gradient"
            x1="0"
            y1="0"
            x2="120"
            y2="120"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3B82F6" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
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

// Use a Lucide icon
<>
  <Icon name="users" size={24} />

  {/* Use the app logo */}
  <Logo className="w-12 h-12" />

  {/* Use custom icons */}
  <NetworkIcon />
  <ConnectIcon />
  <EventIcon />
</>
