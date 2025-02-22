import RootLayout from "@/app/dashboard/Layout";

function MyApp({ Component, pageProps }: any) {
  return (
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
  );
}

export default MyApp;
