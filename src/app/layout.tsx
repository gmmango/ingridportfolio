// layout.tsx
import { Inter } from "next/font/google";
import "./../styles/globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "3D Animation Portfolio | [Your Name]",
  description: "Portfolio of cinematic 3D animation, motion graphics, and VFX by [Your Name].",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`bg-(--background-primary) text-(--color-primary) ${inter.className} overflow-x-hidden`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
