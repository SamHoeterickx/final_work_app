/* eslint-disable @typescript-eslint/no-require-imports */
import { useGLTF as loadGLTF, useGLTF } from '@react-three/drei/native';
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

export function usePreloadModels(enabled: boolean = true) {
    const [isReady, setIsReady] = useState(!enabled);

    useEffect(() => {
        let cancelled = false;

        if (!enabled) {
            setIsReady(true);
            return;
        }

        const preload = async () => {
            modelAssets.forEach((asset) => useGLTF.preload(asset));

            await Promise.all(
                modelAssets.map(
                    (asset) =>
                        new Promise<void>((resolve) => {
                            const interval = setInterval(() => {
                                try {
                                    loadGLTF(asset);
                                    clearInterval(interval);
                                    resolve();
                                } catch {}
                            }, 100);
                        }),
                ),
            );

            if (!cancelled) {
                console.log('All models preloaded');
                setIsReady(true);
            }
        };

        preload();
        return () => {
            cancelled = true;
        };
    }, [enabled]);

    return { isReady };
}
