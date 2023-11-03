import "../styles/fonts.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import GoogleAnalytics from "../components/GoogleAnalytics";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics gaId="G-949Z3C8XK7" />
      <Component {...pageProps} />
    </>
  );
}
