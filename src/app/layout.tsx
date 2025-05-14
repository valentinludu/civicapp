import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../tailwind.css";
import "../index.css";
import "@radix-ui/themes/tokens/base.css";
import "@radix-ui/themes/styles.css";
import { Footer } from "@/components/layout/Footer";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { gray, green, greenDark } from "@radix-ui/colors";
import { HomeFormProvider } from "@/components/Complaint/FormContext";

const theme = {
  colors: {
    ...gray,
    ...green,
    background: gray.gray9,
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CivilApp",
  description: "A React project migrated from Vite to Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} flex flex-col min-h-screen bg-gray-100`}
      >
        <Theme
          accentColor="jade"
          grayColor="sage"
          panelBackground="translucent"
          hasBackground={false}
        >
          <HomeFormProvider>
            <main className="flex-1 max-w-md mx-auto w-full px-4 pt-20 pb-4">
              {children}
            </main>
          </HomeFormProvider>
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
