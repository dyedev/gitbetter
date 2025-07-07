import { cacheExchange, createClient, fetchExchange, mapExchange } from "urql";
import { authExchange } from "@urql/exchange-auth";
import { useSession } from "next-auth/react";
import React from "react";
import { toast } from "sonner";

// YOUR API URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_GITHUB_GRAPHQL_API_URL ||
  "https://api.github.com/graphql";

export const useClient = () => {
  const { data: session } = useSession();

  return React.useMemo(() => {
    const client = createClient({
      url: API_BASE_URL,
      exchanges: [
        cacheExchange,
        authExchange(async () => {
          return {
            addAuthToOperation(operation) {
              operation.context.fetchOptions = {
                ...operation.context.fetchOptions,
                headers: {
                  ...(operation.context.fetchOptions as RequestInit)?.headers,
                  Authorization: `Bearer ${session?.accessToken}`,
                },
              };

              return operation;
            },
            didAuthError: ({ graphQLErrors }) => {
              return graphQLErrors.some(
                (e) => e.extensions?.code === "FORBIDDEN",
              );
            },
            willAuthError: () => !session?.accessToken,
            refreshAuth: async () => {},
          };
        }),
        mapExchange({
          onError: (error) => {
            toast.error(error.message);
          },
        }),
        fetchExchange,
      ],
    });

    return client;
  }, [session]);
};
