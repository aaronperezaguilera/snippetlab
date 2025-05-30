import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { dark } from "@clerk/themes";
import { Header } from "@/components/header";
import { Sidebar, SidebarProvider } from "@/components/sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnippetLab",
  description: "The ultimate code snippet social network",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark text-[#fafafa] bg-background min-h-screen`}
        >
          <SidebarProvider>
            <Header />
            {user && <Sidebar />}
            {children}
            <Footer />
            <Toaster />
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
