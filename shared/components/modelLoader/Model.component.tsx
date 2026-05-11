import { Gltf } from '@react-three/drei/native';

import PuckPrep from '../../../assets/models/puck_prep_model_test.glb';

export const Model = () => {
    return (
        <group>
            <Gltf src={PuckPrep} />
        </group>
    )
}