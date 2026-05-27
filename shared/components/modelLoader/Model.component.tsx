import { Gltf } from '@react-three/drei/native';

import PuckPrep from '../../../assets/models/latte_art.glb';
import { FC } from 'react';

interface props {
    size: [number, number, number];
    position: [number, number, number];
}

export const Model: FC<props> = ({ size, position }) => {
    return (
        <group>
            <Gltf src={PuckPrep} scale={size} position={position}/>
        </group>
    );
};
