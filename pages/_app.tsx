import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("Service Worker registrado con éxito:", registration);
          })
          .catch((error) => {
            console.log("Error al registrar el Service Worker:", error);
          });
      });
    }
  }, []);

  return <Component {...pageProps} />;
}
