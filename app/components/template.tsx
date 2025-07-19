"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
import { Icon, Logo } from "./ui/icons";
import Link from "next/link";
import dynamic from "next/dynamic";

const NotificationProvider = dynamic(
  () =>
    import("../context/NotificationContext").then(
      (mod) => mod.NotificationProvider
    ),
  {
    ssr: false,
  }
);

const NotificationPanel = dynamic(
  () =>
    import("./notifications/NotificationPanel").then(
      (mod) => mod.NotificationPanel
    ),
  {
    ssr: false,
  }
);

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", iconName: "home" },
  { title: "Search", url: "/search", iconName: "search" },
  { title: "Discover", url: "/discover", iconName: "users" },
  { title: "Messages", url: "/messages", iconName: "message" },
  { title: "Events", url: "/events", iconName: "calendar" },
  { title: "Profile", url: "/profile", iconName: "settings" },
];

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider>
      <div className="flex min-h-screen">
        {/* Mobile backdrop */}
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-200 sidebar-backdrop" />

        <Sidebar className="border-r border-slate-200/60 bg-white/80 backdrop-blur-md">
          <SidebarHeader className="border-b border-slate-200/60 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Logo className="w-10 h-10" />
                <div>
                  <h2 className="font-bold text-slate-900 text-lg">
                    FounderConnect
                  </h2>
                  <p className="text-xs text-slate-500">
                    Network • Grow • Succeed
                  </p>
                </div>
              </div>
              <NotificationPanel />
            </div>
          </SidebarHeader>

          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className="mb-1 h-11 px-4 rounded-xl transition-all duration-200 hover:bg-slate-100 text-slate-700 hover:text-slate-900"
                      >
                        <Link
                          href={item.url}
                          className="flex items-center gap-3"
                        >
                          <Icon name={item.iconName} size={20} />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200/60 p-4">
            <div className="text-sm text-slate-500 text-center">
              © 2025 FounderConnect
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
      </div>
    </NotificationProvider>
  );
}
