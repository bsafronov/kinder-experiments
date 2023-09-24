import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/shared/providers";
import { ModalWidget } from "@/widgets/modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Мои дети",
  description: "Детский сад - управление детьми",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="ru">
        <body className={inter.className}>
          <Providers>
            <ModalWidget />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
