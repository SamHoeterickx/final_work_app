import { ICameraControllerProps } from '@/shared/types/types';
import { useFrame, useThree } from '@react-three/fiber/native';
import { FC, useMemo } from 'react';
import * as THREE from 'three';

export const CameraController: FC<ICameraControllerProps> = ({ position, target }) => {
    const { camera } = useThree();

    const targetPosition = useMemo(() => new THREE.Vector3(...position), [position]);
    const lookAtTarget = useMemo(() => new THREE.Vector3(...target), [target]);

    useFrame(() => {
        camera.position.lerp(targetPosition, 0.015);
        camera.lookAt(lookAtTarget);
    });

    return null;
};
