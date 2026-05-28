import { ICameraControllerProps } from '@/shared/types/types';
import { useFrame, useThree } from '@react-three/fiber/native';
import { FC, useMemo, useRef } from 'react';
import * as THREE from 'three';

export const CameraController: FC<ICameraControllerProps> = ({ position, target }) => {
    const { camera } = useThree();

    const targetPosition = useMemo(() => new THREE.Vector3(...position), [position]);
    const finalTarget = useMemo(() => new THREE.Vector3(...target), [target]);

    const currentLookAt = useRef(new THREE.Vector3(...target));

    useFrame(() => {
        camera.position.lerp(targetPosition, 0.01);

        currentLookAt.current.lerp(finalTarget, 0.01);
        camera.lookAt(currentLookAt.current);
    });

    return null;
};
