"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  // Start with true for desktop, false for mobile
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Desktop: show sidebar by default
        setIsOpen(true);
      } else {
        // Mobile: hide sidebar by default
        setIsOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Listen for window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar on route change (mobile only)
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  // Close sidebar on escape key (mobile only)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export function Sidebar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isOpen } = useSidebar();
  return (
    <aside
      className={cn(
        // Base styles for the sidebar
        "w-64 flex-shrink-0 transition-all duration-300 ease-in-out",
        // Desktop: always visible with proper width
        "md:translate-x-0 md:static md:block",
        // Mobile: overlay behavior
        "fixed inset-y-0 left-0 z-50",
        // Show/hide based on state
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        className
      )}
    >
      {children}
    </aside>
  );
}

export function SidebarContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function SidebarGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function SidebarGroupContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function SidebarMenu({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <ul className={className}>{children}</ul>;
}

export function SidebarMenuItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <li className={className}>{children}</li>;
}

interface SidebarMenuButtonProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export function SidebarMenuButton({
  children,
  className,
  asChild = false,
}: SidebarMenuButtonProps) {
  if (asChild) {
    return <>{children}</>;
  }
  return <button className={className}>{children}</button>;
}

export function SidebarHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <header className={className}>{children}</header>;
}

export function SidebarFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <footer className={className}>{children}</footer>;
}

export function SidebarTrigger({ className }: { className?: string }) {
  const { toggle } = useSidebar();
  return (
    <button
      onClick={toggle}
      className={cn(
        "md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100",
        className
      )}
      aria-label="Toggle sidebar"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}
