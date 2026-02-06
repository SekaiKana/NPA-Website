"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import NPALogoo from "./img/NPA-transparent.png"; // Load local image
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";

    const navItems = [
        { name: "Philosophy", href: isHome ? "#philosophy" : "/#philosophy" },
        { name: "Methodology", href: isHome ? "#methodology" : "/#methodology" },
        { name: "Services", href: isHome ? "#services" : "/#services" },
        { name: "Contact", href: isHome ? "#contact" : "/#contact" },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <motion.header
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-6 left-1/2 z-50 w-[95%] md:w-[80%] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex items-center justify-between gap-4 md:gap-40 px-6 md:px-12 py-3"
        >
            <div className="flex items-center">
                <Link href="/" className="font-pt-serif text-lg md:text-2xl text-primary hover:text-white transition-colors flex items-center gap-3 md:gap-4">
                    <Image
                        src={NPALogoo}
                        alt="NPA Logo"
                        width={100}
                        height={100}
                        className="w-7 h-7 md:w-12 md:h-12 object-contain"
                        style={{ filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 1.0))" }}

                    />
                    <span className="hidden md:inline">Neural Point Analytica</span>
                    <span className="md:hidden">NPA</span>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-12 ml-8">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-xs uppercase tracking-widest text-primary/70 hover:text-primary transition-colors font-mono"
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-primary focus:outline-none">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-full bg-[#1a1614]/95 backdrop-blur-xl border border-white/10 rounded-2xl mt-2 p-6 flex flex-col items-center space-y-6 md:hidden shadow-xl"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="text-sm uppercase tracking-widest text-primary/70 hover:text-primary transition-colors font-mono"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
