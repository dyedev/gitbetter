import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/github/header";
import ClientProviders from "@/components/providers/client-providers";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/providers/session-provider";

export const metadata: Metadata = {
  title: "GitBetter",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ClientProviders>
            <div className="min-h-screen bg-background">
              {/* Header */}
              <Header />
              {/* Main Content */}
              <main className="container px-6 py-6 max-w-7xl">{children}</main>
              <Toaster position="top-center" />
            </div>
          </ClientProviders>
        </SessionProvider>
      </body>
    </html>
  );
}
