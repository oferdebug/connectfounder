'use client';

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from './ui/sidebar';
import { LayoutDashboard, Compass, MessageCircle, Calendar, User } from 'lucide-react';
import Link from 'next/link';

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Discover", url: "/discover", icon: Compass },
  { title: "Messages", url: "/messages", icon: MessageCircle },
  { title: "Events", url: "/events", icon: Calendar },
  { title: "Profile", url: "/profile", icon: User },
];

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Mobile backdrop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-200 sidebar-backdrop" />

      <Sidebar className="border-r border-slate-200/60 bg-white/80 backdrop-blur-md">
        <SidebarHeader className="border-b border-slate-200/60 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">FC</span>
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-lg">
                FounderConnect
              </h2>
              <p className="text-xs text-slate-500">
                Network • Grow • Succeed
              </p>
            </div>
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
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
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

      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </>
  );
}
