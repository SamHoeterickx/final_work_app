import { Canvas } from '@react-three/fiber/native';
import { FC } from 'react';

// COMPONENTS
import { CameraController } from '../../camera/CameraController.component';
import { FloatingGroup } from './FloatingGroup.component';

// TYPES
import { EProgressStatus } from '@/shared/types/enums';
import { IChapterSceneProps } from '@/shared/types/types';

// CONST
import { ISLAND_HEIGHT, LESSON_RADIUS } from '@/shared/const/chapter.const';
import { LessonMesh } from './LessonMesh.component';



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
            const angle = -(index / totalLessons) * Math.PI * 2;
            const x = Math.cos(angle) * LESSON_RADIUS;
            const z = Math.sin(angle) * LESSON_RADIUS;

            const isLocked = lesson.status === EProgressStatus.LOCKED;
            const isCurrent = lesson.status === EProgressStatus.INPROGRESS || lesson.status === EProgressStatus.UNLOCKED;

            return (
                <LessonMesh
                    key={lesson.uuid}
                    position={[x, ISLAND_HEIGHT - 0.175, z]}
                    onClick={() => onLessonClick(index, lesson)}
                    isLocked={isLocked}
                    isCurrent={isCurrent}
                    delay={index * 150}
                />
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
