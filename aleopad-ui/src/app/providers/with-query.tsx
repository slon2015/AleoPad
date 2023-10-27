import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const withQuery = (component: () => React.ReactNode) => () =>
  <QueryClientProvider client={queryClient}>{component()}</QueryClientProvider>;
