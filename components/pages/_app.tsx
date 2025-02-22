import LayoutPage from "@/app/dashboard/Layout";

function MyApp({ Component, pageProps }: any) {
  return (
      <LayoutPage>
        <Component {...pageProps} />
      </LayoutPage>
  );
}

export default MyApp;
