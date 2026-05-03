import { IIslandModelProps } from '@/shared/types/types';
import { useGLTF } from '@react-three/drei/native';
import { useFrame } from '@react-three/fiber';
import React, { FC, useRef } from 'react';
import { Group } from 'three';


export const IslandModel: FC<IIslandModelProps> = ({ islandPath, scale = 1 }) => {
  const gltf = useGLTF(islandPath);
  const scene = Array.isArray(gltf) ? gltf[0].scene : gltf.scene;
  
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={scale} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}
