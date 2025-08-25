import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ThemeProvider,
  ThemeStyleProvider,
} from "../components/layouts/theme-provider";
import { Toaster } from "../components/ui/sonner";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlcaHEX-Studio",
  description:
    "AlcaHEX-Studio - Advanced AI Technology Landing Page",
  icons: {
    icon: "/Utility-web/logoweb.png",
    shortcut: "/Utility-web/logoweb.png",
    apple: "/Utility-web/logoweb.png",
  },
};

// const themes = BASE_THEMES.flatMap((t) => [t, `${t}-dark`]);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={["light", "dark"]}
          storageKey="app-theme-v2"
          disableTransitionOnChange
        >
          <ThemeStyleProvider>
            <NextIntlClientProvider messages={messages}>
              <div id="root">
                {children}
                <Toaster richColors />
              </div>
            </NextIntlClientProvider>
          </ThemeStyleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

