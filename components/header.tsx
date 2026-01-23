"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import NPALogoo from "./img/NPA-transparent.png"; // Load local image
import { motion } from "framer-motion";

export function Header() {
    const navItems = [
        { name: "Methodology", href: "#philosophy" },
        { name: "Services", href: "#services" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <motion.header
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-6 left-1/2 z-50 w-[80%] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex items-center justify-between gap-40 px-12 py-4"
        >
            <div className="flex items-center">
                <Link href="/" className="font-pt-serif text-2xl text-primary hover:text-white transition-colors flex items-center gap-4">
                    <Image
                        src={NPALogoo}
                        alt="NPA Logo"
                        width={100}
                        height={100}
                        className="w-12 h-12 object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.8)]"
                    />
                    <span className="hidden md:inline">Neural Point Analytica</span>
                    <span className="md:hidden">NPA</span>
                </Link>
            </div>

            <nav className="flex items-center space-x-6 md:space-x-12 ml-8">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-[10px] md:text-xs uppercase tracking-widest text-primary/70 hover:text-primary transition-colors font-mono"
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </motion.header>
    );
}
