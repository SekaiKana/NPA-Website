"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// Shader for custom particle aesthetics
const fragmentShader = `
    varying float vAlpha;
    void main() {
        if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;
        gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha * 0.5);
    }
`;

const vertexShader = `
    attribute float size;
    attribute float alpha;
    varying float vAlpha;
    void main() {
        vAlpha = alpha;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
    }
`;

function Particles({ scrollProgress }: { scrollProgress: number }) {
    const points = useRef<THREE.Points>(null!);
    const count = 3000;

    // Define states
    // State 0: Chaos (Random distribution)
    // State 1: Grid (Structured Order)
    // State 2: Horizon (Flat plane)

    const { chaosPositions, gridPositions, horizonPositions, colors, sizes, alphas } = useMemo(() => {
        const chaos = new Float32Array(count * 3);
        const grid = new Float32Array(count * 3);
        const horizon = new Float32Array(count * 3);

        const col = new Float32Array(count * 3);
        const sz = new Float32Array(count);
        const al = new Float32Array(count);

        // GRID GENERATION
        const gridSize = 30; // spread
        const gridStep = 1.5;
        let p = 0;
        for (let x = -gridSize; x < gridSize; x += gridStep) {
            for (let z = -gridSize; z < gridSize; z += gridStep) {
                if (p >= count * 3) break;

                // Grid State
                grid[p] = x;
                grid[p + 1] = 0;
                grid[p + 2] = z;

                // Chaos State (Random around the grid center)
                chaos[p] = (Math.random() - 0.5) * 40;
                chaos[p + 1] = (Math.random() - 0.5) * 40;
                chaos[p + 2] = (Math.random() - 0.5) * 20;

                // Horizon -> Sphere (Clarity/Conclusion)
                // Sphere State: Particles on surface of a sphere
                // Radius = 12

                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);
                const radius = 4.5 + Math.random() * 0.2; // Smaller radius to fit in view

                horizon[p] = radius * Math.sin(phi) * Math.cos(theta);
                horizon[p + 1] = radius * Math.sin(phi) * Math.sin(theta);
                horizon[p + 2] = radius * Math.cos(phi);

                sz[p / 3] = Math.random() * 0.5 + 0.1;
                al[p / 3] = Math.random() * 0.5 + 0.2;
                p += 3;
            }
        }

        return {
            chaosPositions: chaos,
            gridPositions: grid,
            horizonPositions_raw: horizon, // naming to avoid conflict if needed
            horizonPositions: horizon,
            colors: col,
            sizes: sz,
            alphas: al
        };
    }, []);

    // Current positions array to update
    const currentPositions = useMemo(() => new Float32Array(count * 3), []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Determine target state based on scroll
        // 0.0 - 0.3: Chaos -> Grid
        // 0.3 - 0.6: Grid -> steady
        // 0.6 - 1.0: Grid -> Horizon

        const scroll = scrollProgress; // Passed from parent, normalized 0-1 ideally, or raw scrollY

        // We need normalized scroll. Since this is inside canvas, we might need a trusted source.
        // For now, let's assume scrollProgress is passed as a 0-1 value or we calculate it.
        // Actually, passing raw scrollY and dividing by doc height is better done outside.
        // Let's rely on the prop `scrollProgress` being 0-1.

        let targetPositions = chaosPositions;
        let mixFactor = 0;

        if (scroll < 0.25) {
            // Chaos to Grid
            const progress = scroll / 0.25; // 0 to 1
            // Manually lerp arrays? Too slow in JS for 3000 points every frame? 
            // 3000 is fine.

            for (let i = 0; i < count * 3; i++) {
                // Lerp Chaos -> Grid
                const dest = gridPositions[i];
                const src = chaosPositions[i];
                currentPositions[i] = src + (dest - src) * progress;
            }
        } else if (scroll < 0.7) {
            // Grid (Stable)
            for (let i = 0; i < count * 3; i++) {
                currentPositions[i] = gridPositions[i];
                // Subtle wave
                if (i % 3 === 1) {
                    currentPositions[i] += Math.sin(t * 0.5 + gridPositions[i - 1] * 0.1) * 0.5;
                }
            }
        } else {
            // Grid -> Sphere
            // Smooth transition with earlier start
            const progress = Math.min((scroll - 0.65) / 0.35, 1);
            // Stronger easing
            const eased = 1 - Math.pow(1 - progress, 3); // cubic easeOut

            for (let i = 0; i < count * 3; i++) {
                const src = gridPositions[i];
                const dest = horizonPositions[i];

                currentPositions[i] = src + (dest - src) * eased;
            }

            // Rotate the whole sphere at the end
            if (progress > 0.5) {
                points.current.rotation.y = t * 0.1;
            }
        }

        // Update geometry
        points.current.geometry.attributes.position.needsUpdate = true;

        // Rotation for extra life
        points.current.rotation.y = t * 0.05;

        // Camera Animation
        // Structure View (High Y) -> Sphere View (Center Y)
        const camY = 5 * (1 - Math.max(0, (scroll - 0.7) / 0.3));
        const camZ = 12 + ((scroll > 0.7) ? ((scroll - 0.7) / 0.3) * 3 : 0); // 12 -> 15

        state.camera.position.set(0, camY, camZ);
        state.camera.lookAt(0, 0, 0); // Easing the lookAt might be smoother, but this ensures we see the center
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={currentPositions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={sizes}
                    itemSize={1}
                />
                <bufferAttribute
                    attach="attributes-alpha"
                    count={count}
                    array={alphas}
                    itemSize={1}
                />
            </bufferGeometry>
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                uniforms={{
                    uTime: { value: 0 },
                    uColor: { value: new THREE.Color("#a8a29e") }
                }}
            />
        </points>
    );
}

export function GlobalScene() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = window.scrollY / totalHeight;
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        // Initial call
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 5, 12], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <fog attach="fog" args={["#1a1614", 5, 30]} />
                <Particles scrollProgress={scrollProgress} />
            </Canvas>
        </div>
    );
}
