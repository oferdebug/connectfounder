import { Inter } from "next/font/google";
import "./globals.css";
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
        <div className="min-h-screen w-full">
          <Template>{children}</Template>
        </div>
      </body>
    </html>
  );
}
