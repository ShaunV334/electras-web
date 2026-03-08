"use client";

import { useGLTF, PresentationControls, Environment, ContactShadows, Center } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import Image from "next/image";

function Model() {
    const { nodes, materials } = useGLTF("/raspberry.glb") as any;
    const modelRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (modelRef.current) {
            // Gentle continuous rotation
            modelRef.current.rotation.y += delta * 0.2;
            // Slight float logic
            modelRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
            modelRef.current.rotation.x = 0.2;
        }
    });

    return (
        <group ref={modelRef}>
            {/* Center the raw mesh by discarding the crazy parent translation offsets */}
            <Center>
                <mesh
                    geometry={nodes.Object_3.geometry}
                    material={materials.rpi_L}
                    rotation={[-1.278, -0.539, 0.426]}
                    scale={0.038}
                />
            </Center>
        </group>
    );
}

export function RaspberryPiModel() {
    const [isMounted, setIsMounted] = useState(false);
    const [isStatic, setIsStatic] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);

        const observer = new IntersectionObserver(
            ([entry]) => {
                // If the element is outside the viewport (plus 500px root margin),
                // it switches back to a static image to save performance.
                setIsStatic(!entry.isIntersecting);
            },
            {
                // Trigger intersection slightly before it actually appears in view
                // to allow time for the 3D canvas to render
                rootMargin: "500px",
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    if (!isMounted) return null;

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full z-20">
            {isStatic ? (
                // Static version for performance when scrolled away
                <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
                    <Image
                        src="/hero.png"
                        alt="Raspberry Pi"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            ) : (
                // 3D Interactive version when in view
                <div className="w-full h-full cursor-grab active:cursor-grabbing">
                    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 35 }}>
                        {/* Lights */}
                        <ambientLight intensity={2} />
                        <directionalLight position={[10, 10, 10]} intensity={4} castShadow />
                        <pointLight position={[-10, 0, -10]} intensity={2} color="#ffffff" />

                        <Suspense fallback={<mesh visible={false} />}>
                            <PresentationControls
                                global
                                snap
                                rotation={[0.1, 0, 0]}
                                polar={[-Math.PI / 3, Math.PI / 3]}
                                azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                            >
                                <Center>
                                    <Model />
                                </Center>
                            </PresentationControls>

                            <Environment preset="city" />
                        </Suspense>
                    </Canvas>
                </div>
            )}
        </div>
    );
}

useGLTF.preload("/raspberry.glb");
