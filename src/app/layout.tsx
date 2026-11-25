import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { auth } from "@/lib/auth";
import { generateMetadata } from "@/lib/metadata";

import AuthSuccessToast from "@/components/layout/AuthSuccessToast";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

// Подключаем локальные шрифты
const inter = localFont({
  src: "../fonts/Inter-Regular.ttf", // Убедитесь, что путь правильный
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "../fonts/SpaceGrotesk-Regular.ttf", // Убедитесь, что путь правильный
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata = generateMetadata({
  title: "DevFlow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and connect with other developers from around the world. Explore a vast collection of tutorials, articles, and resources to help you become a better developer.",
  image: "/og-image.png",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="ru" suppressHydrationWarning>
      <SessionProvider session={session}>
        <body
          className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthSuccessToast />
            {children}
            {/* <Footer /> */}
            <Toaster />
          </ThemeProvider>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
          />
        </body>
      </SessionProvider>
    </html>
  );
}