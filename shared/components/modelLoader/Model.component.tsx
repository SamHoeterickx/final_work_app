import { useGLTF } from '@react-three/drei/native';
import { FC, useMemo } from 'react';
import * as THREE from 'three';
import type { GLTF } from 'three-stdlib';

interface props {
    src: string | number;
    size?: [number, number, number] | number;
    position?: [number, number, number];
    rotation?: [number, number, number];
}

export const Model: FC<props> = ({ src, size, position, rotation }) => {
    const { scene } = useGLTF(src as any) as GLTF;

    const clonedScene = useMemo(() => {
        const clone = scene.clone();

        clone.traverse((child) => {
            const mesh = child as THREE.Mesh;
            if (mesh.isMesh && mesh.material) {
                const material = mesh.material as THREE.MeshPhysicalMaterial;
                if (material.transmission && material.transmission > 0) {
                    material.transmission = 0;
                    material.transparent = true;
                    material.opacity = 0.5;
                }
            }
        });
        return clone;
    }, [scene]);

    return (
        <primitive
            object={clonedScene}
            scale={size}
            position={position}
            rotation={rotation || [0, 0, 0]}
        />
    );
};
