import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import "./globals.css";
import { AuthProvider, useAuth } from "@/components/ProtectedRoutes/ProtectedRoutes";
import Header from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";  

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UCOTrack",
  description: "UCOTrack es una aplicación para la gestión de TFGs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <AuthProvider>
          <Header />
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
            <Footer /> 
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
