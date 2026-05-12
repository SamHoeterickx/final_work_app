import { Canvas } from '@react-three/fiber/native';
import { FC } from 'react';

// COMPONENTS
import { CameraController } from '../../camera/CameraController.component';
import { FloatingGroup } from './FloatingGroup.component';

// TYPES
import { IChapterSceneProps } from '@/shared/types/types';

const ISLAND_HEIGHT: number = 0.35;
const LESSONS_RADIUS: number = 0.3;

export const ChapterScene: FC<IChapterSceneProps> = ({
    isFocused,
    cameraPos,
    cameraTarget,
    lessons,
    onLessonClick,
}) => {
    const renderLessons = () => {
        const totalLessons = lessons.length;

        return lessons.map((lesson, index) => {
            const angle = (index / totalLessons) * Math.PI * 2;
            const x = Math.cos(angle) * LESSONS_RADIUS;
            const z = Math.sin(angle) * LESSONS_RADIUS;
            return (
                <mesh
                    key={lesson.uuid}
                    position={[x, ISLAND_HEIGHT - 0.175, z]}
                    onPointerDown={() => onLessonClick(index, lesson)}
                >
                    <cylinderGeometry args={[0.09, 0.09, 0.05]} />
                    <meshBasicMaterial color="darkgreen" />
                </mesh>
            );
        });
    };

    return (
        <Canvas
            camera={{
                fov: 30,
                near: 0.1,
            }}
        >
            <CameraController position={cameraPos} target={cameraTarget} />
            <pointLight position={[0, 20, 10]} intensity={1.5} />

            <FloatingGroup isFocused={isFocused}>
                <mesh>
                    <boxGeometry args={[1, ISLAND_HEIGHT, 1]} />
                    <meshBasicMaterial color="gray" />
                </mesh>

                {isFocused && renderLessons()}
            </FloatingGroup>
        </Canvas>
    );
};
