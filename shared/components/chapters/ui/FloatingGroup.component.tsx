import { FC, useRef } from 'react';
import { useFrame } from '@react-three/fiber/native';
import * as THREE from 'three';

// TYPES
import { IFloatingGroupProps } from '@/shared/types/types';

export const FloatingGroup: FC<IFloatingGroupProps> = ({ isFocused, children }) => {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (isFocused) {
            if (groupRef.current) {
                groupRef.current.rotation.y = THREE.MathUtils.lerp(
                    groupRef.current.rotation.y,
                    0,
                    0.1,
                );
                groupRef.current.position.y = THREE.MathUtils.lerp(
                    groupRef.current.position.y,
                    0,
                    0.1,
                );
            }
            return;
        }

        const t = state.clock.getElapsedTime();

        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(t / 4) / 4;
            groupRef.current.position.y = Math.sin(t / 2) / 10;
        }
    });

    return <group ref={groupRef}>{children}</group>;
};
