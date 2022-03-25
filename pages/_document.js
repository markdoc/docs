import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          id="theme"
          // Set preferred theme before document renders
          dangerouslySetInnerHTML={{
            __html: `document.body.className = localStorage.getItem('theme') || 'light';`
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
