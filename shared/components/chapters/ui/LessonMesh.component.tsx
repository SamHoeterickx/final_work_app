import { ILessonMeshProps } from '@/shared/types/types';
import { useFrame } from '@react-three/fiber/native';
import { FC, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const LessonMesh: FC<ILessonMeshProps> = ({
    position,
    isLocked,
    isCurrent,
    delay,
    onClick,
}) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [active, setActive] = useState(false);
    const [hoverTime, setHoverTime] = useState(Math.random() * 100);

    useEffect(() => {
        const timer = setTimeout(() => setActive(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useFrame((state, delta) => {
        if (meshRef.current) {
            const targetScale = active ? 1 : 0;
            const currentScale = meshRef.current.scale.x;
            const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.15);

            meshRef.current.scale.set(nextScale, nextScale, nextScale);

            if (active && isCurrent) {
                setHoverTime((prev) => prev + delta * 2.5);

                const yOffset = Math.sin(hoverTime) * 0.01;
                meshRef.current.position.y = position[1] + yOffset;
            }
        }
    });

    return (
        <mesh ref={meshRef} position={position} onPointerDown={onClick} scale={[0, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.05]} />
            <meshBasicMaterial color="darkgreen" transparent opacity={isLocked ? 0.3 : 1} />
        </mesh>
    );
};
