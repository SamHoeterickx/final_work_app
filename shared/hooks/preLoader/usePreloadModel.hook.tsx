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
];

export function usePreloadModels() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const preload = async () => {
            modelAssets.forEach((asset) => useGLTF.preload(asset));

            await Promise.all(
                modelAssets.map(
                    (asset) =>
                        new Promise<void>((resolve) => {
                            const interval = setInterval(() => {
                                try {
                                    useGLTF(asset);
                                    clearInterval(interval);
                                    resolve();
                                } catch {
                                }
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
        return () => { cancelled = true; };
    }, []);

    return { isReady };
}