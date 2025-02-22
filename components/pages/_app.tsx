import { SidebarProvider } from "@/components/ui/sidebar";

function MyApp({ Component, pageProps }: any) {
  return (
    <SidebarProvider>
      <Component {...pageProps} />
    </SidebarProvider>
  );
}

export default MyApp;
