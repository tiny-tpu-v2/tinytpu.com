import { Lora } from "next/font/google";
import "./globals.css";
import 'katex/dist/katex.min.css';

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata = {
  title: "Tiny TPU",
  description: "An attempt to understand and build a TPU—by complete novices.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lora.variable} antialiased`}>
        <div className="fixed top-4 left-4 text-sm tracking-wide hidden md:block">
          tinytpu.com
        </div>
        {children}
      </body>
    </html>
  );
}
