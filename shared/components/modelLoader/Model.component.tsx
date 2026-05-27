import { useGLTF } from '@react-three/drei/native';
import { FC, useMemo } from 'react';
import type { GLTF } from 'three-stdlib';

interface props {
    src: string | number;
    size?: [number, number, number] | number;
    position?: [number, number, number];
    rotation?: [number, number, number];
}

export const Model: FC<props> = ({ src, size, position, rotation }) => {
    const { scene } = useGLTF(src as any) as GLTF;

    const clonedScene = useMemo(() => scene.clone(), [scene]);

    return <primitive object={clonedScene} scale={size} position={position} rotation={rotation} />;
};
