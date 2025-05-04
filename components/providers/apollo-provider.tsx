"use client";

import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "@/lib/apollo-client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function ApolloClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Check for token in URL (from OAuth callback)
    const accessToken = searchParams?.get("access_token");
    
    if (accessToken) {
      // Store token in localStorage or a secure cookie
      localStorage.setItem("github_token", accessToken);
      setToken(accessToken);
      
      // Remove token from URL for security
      router.replace("/");
    } else {
      // Check if token exists in localStorage
      const storedToken = localStorage.getItem("github_token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [searchParams, router]);
  
  // Create Apollo client with the token if available
  const client = createApolloClient(token || undefined);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
