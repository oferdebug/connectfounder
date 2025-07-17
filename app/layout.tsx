import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "./components/ui/sidebar";
import Template from "./components/template";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FounderConnect - Network with Fellow Entrepreneurs",
  description: "Connect with founders, share experiences, and grow together",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <Template>{children}</Template>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
