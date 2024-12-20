"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { QueryProviderProps } from "@/types";

const queryClient = new QueryClient();

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
