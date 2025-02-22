import { SidebarProvider } from "@/components/ui/sidebar";
import RootLayout from "@/app/dashboard/Layout";

function MyApp({ Component, pageProps }: any) {
  return (
    <SidebarProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </SidebarProvider>
  );
}

export default MyApp;
