"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function GitHubLoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    
    if (!clientId) {
      console.error("GitHub Client ID is not set");
      return;
    }

    // Redirect to GitHub OAuth authorization URL
    const redirectUri = encodeURIComponent(`${window.location.origin}/api/auth/callback`);
    const scope = encodeURIComponent("user repo");
    
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    
    router.push(authUrl);
  };

  return (
    <Button onClick={handleLogin} className="bg-[#24292e] hover:bg-[#1b1f23] text-white">
      Sign in with GitHub
    </Button>
  );
}