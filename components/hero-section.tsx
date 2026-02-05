"use client";

import { motion } from "framer-motion";

export function HeroSection() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-transparent pt-[60px]">
            {/* Global Scene handles the background */}

            {/* Content Overlay */}
            <div className="relative z-10 h-full w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 items-center">
                <div className="col-span-12 md:col-span-8 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-left"
                    >
                        <h2 className="text-secondary font-mono text-xs md:text-sm tracking-wider mb-8">
                            NEURAL POINT ANALYTICA
                        </h2>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-primary mb-8 leading-[1.1] tracking-tight">
                            <span className="text-[#524a44]">「直感」を</span><br />
                            <span className="">「確信」へ。</span>
                        </h1>

                        <div className="w-full h-[1px] bg-[#333333] mb-8 max-w-sm"></div>

                        <p className="text-secondary max-w-xl text-sm md:text-base leading-relaxed font-sans font-light">
                            データの整理・構造化から始める、中小企業のための経営判断支援。<br />
                            現場に散在するデータを、意思決定に使える形へ。
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator - Minimal */}
            <div className="absolute bottom-0 left-6 md:left-12 z-10">
                <div className="flex flex-col items-center gap-4">
                    <span className="text-[10px] font-mono text-secondary/40 tracking-widest -rotate-90 origin-bottom-left translate-x-2 pb-12">
                        SCROLL
                    </span>

                </div>
            </div>
        </section>
    );
}
