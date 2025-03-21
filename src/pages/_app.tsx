import { Header } from "@/components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
//       gcTime: 24 * 60 * 60 * 1000 + 60 * 60 * 1000, // 25 hours (cache time should exceed stale time)
//       refetchOnMount: false,
//       refetchOnWindowFocus: false,
//       refetchOnReconnect: false,
//     },
//   },
// });
export default function App({ Component, pageProps }: AppProps) {
  return (
    // <QueryClientProvider client={queryClient}>

    <>
      <Header />
      <main className="flex flex-col items-center justify-center gap-6">
        <Component {...pageProps} />
      </main>
    </>
    // </QueryClientProvider>
  );
}
