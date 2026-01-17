// layout.tsx
import { Nunito } from "next/font/google";
import "./../styles/globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "3D Animation Portfolio | Ingrid Sayuri",
  description: "Portfolio of cinematic 3D animation, motion graphics, and VFX by Ingrid Sayuri.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`bg-[var(--background-primary)] text-[var(--color-primary)] ${nunito.className} overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
