import React from 'react';
import Head from 'next/head';

type GoogleAnalyticsProps = {
  gaId: string;
};

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ gaId }) => {
  // No renderizar en el servidor o si no hay ID de seguimiento
  if (!gaId || process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <Head>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `,
        }}
      />
    </Head>
  );
};

export default GoogleAnalytics;
