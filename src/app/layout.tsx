import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhinav Singh | Elite Full-Stack Developer & UI/UX Designer",
  description: "Portfolio of Abhinav Singh, a Silicon Valley-grade Full Stack MERN Developer, UI/UX Designer, and AI + Web3 Software Engineer building ultra-performance systems and immersive 3D digital experiences.",
  keywords: ["Abhinav Singh", "Full Stack Developer", "Software Engineer", "UI/UX Designer", "MERN Stack", "React", "Next.js", "Three.js", "AI Web Apps", "Web3 Developer"],
  authors: [{ name: "Abhinav Singh" }],
  openGraph: {
    title: "Abhinav Singh | Elite Full-Stack Developer & UI/UX Designer",
    description: "Immersive 3D portfolio of Abhinav Singh, full-stack engineer and designer.",
    url: "https://github.com/Aurora-st",
    type: "website",
    images: [
      {
        url: "https://github.com/Aurora-st",
        width: 1200,
        height: 630,
        alt: "Abhinav Singh Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhinav Singh | Elite Full-Stack Developer",
    description: "Immersive 3D portfolio of Abhinav Singh, full-stack engineer and designer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col selection:bg-neon-cyan/30 selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
