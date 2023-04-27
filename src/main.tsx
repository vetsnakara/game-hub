import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";

import App from "./App.tsx";
import { theme } from "./theme.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // retry: 3,
      // cacheTime: 300_000, // 5m
      // staleTime: 10 * 1000, // 10s,
      // refetchOnWindowFocus: false,
      // refetchOnReconnect: false,
      // refetchOnMount: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </ChakraProvider>
);
