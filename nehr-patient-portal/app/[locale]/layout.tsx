import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "@/contexts/auth-provider";
import { ReactQueryProvider } from "@/contexts/react-query-provider";
import { I18nProviderClient } from "@/locales/client";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEHR Client Application",
  description: "NEHR Client Application",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <div className="min-h-screen">
          <NextAuthProvider>
            <ReactQueryProvider>
              <I18nProviderClient locale={locale}>
                {children}
              </I18nProviderClient>
            </ReactQueryProvider>
          </NextAuthProvider>
        </div>
      </body>
    </html>
  );
}
