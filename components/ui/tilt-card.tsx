"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const TiltCard = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    // Rotation range
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: "1000px",
            }}
            className="relative"
        >
            <motion.div
                style={{
                    rotateY,
                    rotateX,
                    transformStyle: "preserve-3d",
                }}
                className={cn("relative transition-all duration-200 ease-linear", className)}
            >
                <div
                    style={{
                        transform: "translateZ(20px)",
                    }}
                    className="relative z-10"
                >
                    {children}
                </div>

                {/* Gloss/Reflection effect */}
                <motion.div
                    style={{
                        opacity: useTransform(mouseYSpring, [-0.5, 0.5], [0, 0.1]),
                        background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
                    }}
                    className="absolute inset-0 rounded-[inherit] z-20 pointer-events-none"
                />
            </motion.div>
        </div>
    );
};
