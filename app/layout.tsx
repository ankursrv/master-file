import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "TypeScript Learning",
  description: "Next.js App with Tailwind CSS",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
