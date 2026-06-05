import { Canvas } from '@react-three/fiber/native';
import { FC, Suspense } from 'react';

// COMPONENTS
import { CameraController } from '../../camera/CameraController.component';
import { FloatingGroup } from './FloatingGroup.component';

// TYPES
import { EIslandModels, EProgressStatus } from '@/shared/types/enums';
import { IChapterSceneProps } from '@/shared/types/types';

// CONST
import { ISLAND_HEIGHT, LESSON_RADIUS } from '@/shared/const/chapter.const';
import { FloatingIsland } from '../../modelLoader/FloatingIsland.component';
import { LessonMesh } from './LessonMesh.component';

export const ChapterScene: FC<IChapterSceneProps & { modelUrl?: EIslandModels | null }> = ({
    isFocused,
    cameraPos,
    cameraTarget,
    lessons,
    onLessonClick,
    modelUrl,
}) => {
    const renderLessons = () => {
        const totalLessons = lessons.length;

        return lessons.map((lesson, index) => {
            const angle = -(index / totalLessons) * Math.PI * 2;
            const x = Math.cos(angle) * LESSON_RADIUS;
            const z = Math.sin(angle) * LESSON_RADIUS;

            const isLocked = lesson.status === EProgressStatus.LOCKED;
            const isCurrent =
                lesson.status === EProgressStatus.INPROGRESS ||
                lesson.status === EProgressStatus.UNLOCKED;

            return (
                <LessonMesh
                    key={lesson.uuid}
                    position={[x, ISLAND_HEIGHT + 0.375, z]}
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
                position: cameraPos,
                fov: 30,
                near: 0.1,
            }}
            gl={{ antialias: false, powerPreference: 'high-performance' }}
        >
            <CameraController position={cameraPos} target={cameraTarget} />
            <ambientLight intensity={1.2} />
            <hemisphereLight groundColor="#465E3C" intensity={0.8} />
            <spotLight position={[0, 4, 4]} intensity={2.5} angle={0.5} penumbra={1} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} />
            <directionalLight position={[-10, 10, -10]} intensity={0.5} />

            <FloatingGroup isFocused={isFocused}>
                <Suspense fallback={null}>
                    <FloatingIsland animation={false} modelUrl={modelUrl} scale={0.3} />
                    {isFocused && renderLessons()}
                </Suspense>
            </FloatingGroup>
        </Canvas>
    );
};
