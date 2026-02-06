"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

const ParticleFlow = () => {
    const count = 4000;
    const points = useRef<THREE.Points>(null!);

    // Generate random initial positions and velocities
    const { positions, velocities } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Spread particles across a wide volume
            positions[i * 3] = (Math.random() - 0.5) * 50;     // X
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30; // Y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // Z

            // Random velocities for individualized movement
            velocities[i * 3] = Math.random() * 0.02 + 0.01; // Speed X
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01; // Speed Y (drift)
            velocities[i * 3 + 2] = 0;
        }
        return { positions, velocities };
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const pos = points.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Move particle
            pos[i3] -= velocities[i3] * 2; // Move left continuously
            // pos[i3 + 1] += Math.sin(time * 0.5 + pos[i3] * 0.5) * 0.01; // Gentle undulating Y

            // Wrap around screen
            if (pos[i3] < -25) {
                pos[i3] = 25;
                pos[i3 + 1] = (Math.random() - 0.5) * 30; // Reset Y randomly
            }

            // Pseudo-flow field effect: Y velocity affected by position
            const flowY = Math.sin(pos[i3] * 0.2 + time * 0.5) * 0.02;
            pos[i3 + 1] += flowY;
        }
        points.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#a8a29e" // text-secondary color
                sizeAttenuation={true}
                transparent={true}
                opacity={0.5}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

export const WavyBackground = () => {
    return (
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[#1a1614]">
            <Canvas
                camera={{ position: [0, 0, 15], fov: 75 }}
                gl={{ antialias: true, alpha: false }} // Alpha false for solid background color
            >
                <ParticleFlow />
            </Canvas>
        </div>
    );
};
