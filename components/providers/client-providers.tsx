"use client";

import { SessionProvider } from "@/components/providers/session-provider";
import { UrqlProvider } from "@/components/providers/graphql-provider";
import { useClient } from "@/lib/graphql-client";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = useClient();

  return <UrqlProvider value={client}>{children}</UrqlProvider>;
}
