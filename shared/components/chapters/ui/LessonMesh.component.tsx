import { ILessonMeshProps } from "@/shared/types/types";
import { useFrame } from "@react-three/fiber";
import { FC, useEffect, useRef, useState } from "react";
import * as THREE from 'three';

export const LessonMesh: FC<ILessonMeshProps> = ({ position, isLocked, delay, onClick }) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setActive(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useFrame(() => {
        if (meshRef.current) {
            const targetScale = active ? 1 : 0;
            const currentScale = meshRef.current.scale.x;
            const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.15);
            
            meshRef.current.scale.set(nextScale, nextScale, nextScale);
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            onPointerDown={onClick}
            scale={[0, 0, 0]}
        >
            <cylinderGeometry args={[0.09, 0.09, 0.05]} />
            <meshBasicMaterial color="darkgreen" transparent opacity={isLocked ? 0.3 : 1} />
        </mesh>
    );
};