import "@mantine/core/styles.css";

import React from "react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

export const metadata = {
  title: "Cookie Shop",
  description: "Cookie Shop - Carlos Alberto",
};

const theme = {
  colorScheme: "light",
  fontFamily: "Arial, sans-serif",
  headings: {
    fontFamily: "Roboto, sans-serif",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
