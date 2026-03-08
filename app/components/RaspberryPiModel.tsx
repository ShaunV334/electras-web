"use client";

import { useGLTF, PresentationControls, Environment, ContactShadows, Center } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";

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

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="absolute inset-0 w-full h-full z-20 cursor-grab active:cursor-grabbing">
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 35 }}>
                {/* Lights */}
                <ambientLight intensity={2} />
                <directionalLight position={[10, 10, 10]} intensity={4} castShadow />
                <pointLight position={[-10, 0, -10]} intensity={2} color="#ffffff" />

                <Suspense fallback={
                    <mesh visible={false} />
                }>
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
    );
}

useGLTF.preload("/raspberry.glb");
