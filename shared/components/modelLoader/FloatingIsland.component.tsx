import * as THREE from 'three';
import { FC, useRef } from "react";
import { useFrame } from '@react-three/fiber';
import { IFloatingIslandProps } from '@/shared/types/types';

export const FloatingIsland: FC<IFloatingIslandProps> = ({ animation=true }) => {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current && animation) {
            groupRef.current.rotation.y = t * 0.5;
            groupRef.current.position.y = Math.sin(t * 2) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            <mesh position={[0, -0.2, 0]}>
                <cylinderGeometry args={[1.5, 1.2, 0.4, 16]} />
                <meshStandardMaterial color="#4A5D44" />
            </mesh>
        </group>
    );
};
