import "../styles/fonts.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import GoogleAnalytics from "../components/GoogleAnalytics";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <GoogleAnalytics gaId="G-949Z3C8XK7" />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
