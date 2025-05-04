"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function GitHubLogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove GitHub token from localStorage
    localStorage.removeItem("github_token");
    
    // Refresh the page to reset the authentication state
    router.refresh();
  };

  return (
    <Button 
      onClick={handleLogout} 
      variant="outline" 
      size="sm"
      className="text-sm"
    >
      Sign out
    </Button>
  );
}