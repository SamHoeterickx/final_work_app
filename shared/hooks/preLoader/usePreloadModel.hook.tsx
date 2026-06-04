import { useGLTF } from '@react-three/drei/native';
import { useEffect, useState } from 'react';

const modelAssets = [
    require('../../../assets/models/coffee_bag.glb'),
    require('../../../assets/models/coffee_tamper.glb'),
    require('../../../assets/models/coffee_fruit.glb'),
    require('../../../assets/models/turkish_coffee_pot.glb'),
    require('../../../assets/models/espresso.glb'),
    require('../../../assets/models/french_press.glb'),
    require('../../../assets/models/grind_size.glb'),
    require('../../../assets/models/milk_pitcher.glb'),
    require('../../../assets/models/moka_pot.glb'),
    require('../../../assets/models/portafilter.glb'),
    require('../../../assets/models/aeropress.glb'),
    require('../../../assets/models/pour_over.glb'),
    require('../../../assets/models/gooseneck_kettle.glb'),
    require('../../../assets/models/puck_prep.glb'),
    require('../../../assets/models/coffee_cup.glb'),
];

export function usePreloadModels(enabled: boolean = false) {
    const [isReady, setIsReady] = useState(!enabled);

    useEffect(() => {
        if (!enabled) return;

        async function preloadAll() {
            for (const src of modelAssets) {
                try {
                    await useGLTF.preload(src as unknown as string);
                } catch (error) {
                    console.warn('Failed to load a specific 3D model:', error);
                }
            }

            setIsReady(true);
        }

        preloadAll();
    }, [enabled]);

    return { isReady };
}
