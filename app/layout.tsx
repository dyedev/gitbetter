import type { Metadata } from "next";
import { ApolloClientProvider } from "@/components/providers/apollo-provider";

import "./globals.css";
import Header from "@/components/github/header";

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
        <ApolloClientProvider>
          <div className="min-h-screen bg-background">
            {/* Header */}
            <Header />
            {/* Main Content */}
            <main className="container px-6 py-6 max-w-7xl">{children}</main>
          </div>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
