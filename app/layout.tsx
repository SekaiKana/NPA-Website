import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP, JetBrains_Mono, PT_Serif } from "next/font/google"; // Added PT_Serif
import "./globals.css";
import { cn } from "@/lib/utils";
import { GlobalScene } from "@/components/three/global-scene";

const notoSansJP = Noto_Sans_JP({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    variable: "--font-noto-sans",
});

const notoSerifJP = Noto_Serif_JP({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    variable: "--font-noto-serif",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    variable: "--font-jetbrains-mono",
});

const ptSerif = PT_Serif({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-pt-serif",
});

export const metadata: Metadata = {
    title: "Neural Point Analytica | データ主導の意思決定",
    description: "Neural Point Analytica delivers decision-ready data systems for high-stakes business environments.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja" suppressHydrationWarning>
            <body className={cn(
                "min-h-screen bg-background font-sans antialiased",
                notoSansJP.variable,
                notoSerifJP.variable,
                jetbrainsMono.variable,
                ptSerif.variable
            )}>
                <GlobalScene />
                <main className="relative flex flex-col min-h-screen z-10">
                    {children}
                </main>
            </body>
        </html>
    );
}

