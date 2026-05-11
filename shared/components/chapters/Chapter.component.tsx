import { Canvas, useFrame, useThree } from '@react-three/fiber/native';
import { FC, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import * as THREE from 'three';

// COMPONENTS
import { Button, SvgIcon } from '../index';

// STYLES
import { baseStyles } from '@/shared/styles/design.system';

// TYPES
import { EProgressStatus, ESvgIconName } from '@/shared/types/enums';
import { IChapterProps, ILessonsChapter } from '@/shared/types/types';

const ISLAND_HEIGHT: number = .35;

const CameraController = ({
    position,
    target,
}: {
    position: [number, number, number];
    target: [number, number, number];
}) => {
    const { camera } = useThree();
    const targetPosition = useMemo(() => new THREE.Vector3(...position), [position]);
    const lookAtTarget = useMemo(() => new THREE.Vector3(...target), [target]);

    useFrame(() => {
        camera.position.lerp(targetPosition, 0.05);
        camera.lookAt(lookAtTarget);
    });
    return null;
};

const FloatingGroup = ({ isFocused, children }: { isFocused: boolean, children: React.ReactNode }) => {
    const groupRef = useRef<THREE.Group>(null!);
    useFrame((state) => {
        if (isFocused) {
            if (groupRef.current) {
                groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1);
                groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.1);
            }
            return;
        }
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(t / 4) / 4;
            groupRef.current.position.y = Math.sin(t / 2) / 10;
        }
    });
    return <group ref={groupRef}>{children}</group>;
};

export const Chapter: FC<IChapterProps & { slideAnim?: Animated.Value }> = ({
    chapterUser,
    slideAnim,
    isFocused,
    setIsFocused,
}) => {
    const [cameraPos, setCameraPos] = useState<[number, number, number]>([-2, 2.5, 5]);
    const [cameraTarget, setCameraTarget] = useState<[number, number, number]>([0, 0.5, 0]);

    const [selectedLesson, setSelectedLesson] = useState<ILessonsChapter | null>(null);

    const renderStatus = () => {
        if (chapterUser.status === EProgressStatus.LOCKED && !isFocused) {
            return (
                <View>
                    <Text style={[baseStyles.h3, styles.status]}>Locked</Text>
                    <SvgIcon name="locked" />
                </View>
            );
        } else if(isFocused && selectedLesson){
            return (
                <Text
                    style={[baseStyles.h3, styles.status]}
                >{selectedLesson.status}</Text>
            );
        }else {
            const allLessons = chapterUser.chapter.lessons || [];
            const completed = allLessons.filter(
                (lesson) => lesson.status !== EProgressStatus.LOCKED,
            );
            return (
                <Text
                    style={[baseStyles.h3, styles.status]}
                >{`${completed.length} / ${allLessons.length}`}</Text>
            );
        }


    };

    const renderButtonCopy = () => {
        if(!isFocused) {
            switch (chapterUser.status) {
                case EProgressStatus.LOCKED:
                    return 'chapter.buttons.locked';
                case EProgressStatus.UNLOCKED:
                    return 'chapter.buttons.start';
                case EProgressStatus.INPROGRESS:
                    return 'chapter.buttons.continue';
                case EProgressStatus.COMPLETED:
                    return 'chapter.buttons.completed';
            }
        }

        if(isFocused){
            switch (chapterUser.status) {
                case EProgressStatus.LOCKED:
                    return 'chapter.buttons.locked';
                case EProgressStatus.UNLOCKED:
                    return 'chapter.buttons.start';
                case EProgressStatus.INPROGRESS:
                    return 'Start';
                case EProgressStatus.COMPLETED:
                    return 'chapter.buttons.completed';
            }
        }

        return 'continue'
    };

    const renderButtonIcon = () => {
        switch (chapterUser.status) {
            case EProgressStatus.LOCKED:
                return ESvgIconName.LOCKED;
            case EProgressStatus.UNLOCKED:
                return ESvgIconName.ARROW_LEFT_FULL;
            case EProgressStatus.INPROGRESS:
                return ESvgIconName.ARROW_LEFT_FULL;
            case EProgressStatus.COMPLETED:
                return ESvgIconName.ARROW_LEFT_FULL;
        }
    };

    const renderTitle = () => {
        if(!isFocused) return `${chapterUser.chapter.name}`;

        if(isFocused){
            return selectedLesson?.name
        }
    }

    const handleButton = () => {
        console.log('pressed');
        
        const activeIndex = chapterUser.chapter.lessons.findIndex(
            (lesson) =>
                lesson.status === EProgressStatus.INPROGRESS ||
                lesson.status === EProgressStatus.UNLOCKED
        );

        if (activeIndex !== -1) {
            handleLessonClick(activeIndex, chapterUser.chapter.lessons[activeIndex]);
        } else {
            setCameraPos([0, 2.5, 1.5]);
            setCameraTarget([0, 0.5, 0]);
        }
        setIsFocused(true);
    };

    const handleLessonClick = (index: number, lesson: ILessonsChapter) => {
        const totalLessons = chapterUser.chapter.lessons.length;
        const lessonRadius = 0.35;
        const cameraRadius = 2.25;
        const cameraHeight = 2.25; 

        const angle = (index / totalLessons) * Math.PI * 2;

        const lessonX = Math.cos(angle) * lessonRadius;
        const lessonZ = Math.sin(angle) * lessonRadius;
        setCameraTarget([lessonX, 0.5, lessonZ]);

        const camX = Math.cos(angle) * cameraRadius;
        const camZ = Math.sin(angle) * cameraRadius;
        setCameraPos([camX, cameraHeight, camZ]);
        setSelectedLesson(lesson)
    };

    const renderLessons = () => {
        const totalLessons = chapterUser.chapter.lessons.length;
        const radius = 0.3;
        return chapterUser.chapter.lessons.map((lesson, index) => {
            const angle = (index / totalLessons) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            return (
                <mesh
                    key={lesson.uuid}
                    position={[x, ISLAND_HEIGHT - 0.175, z]}
                    onPointerDown={() => handleLessonClick(index, lesson)}
                >
                    <cylinderGeometry args={[0.09, 0.09, 0.05]} />
                    <meshBasicMaterial color="darkgreen" />
                </mesh>
            );
        });
    };

    return (
        <>
            <View style={styles.cTitle}>
                <Text style={[baseStyles.h2, styles.chapterTitle]}>{renderTitle()}</Text>
                {renderStatus()}
            </View>
            <Animated.View
                style={[
                    styles.imageContainer,
                    { transform: slideAnim ? [{ translateX: slideAnim }] : [] },
                ]}
            >
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
            </Animated.View>
            <View style={styles.cButton}>
                <Button
                    copy={renderButtonCopy()}
                    disabled={chapterUser.status === EProgressStatus.LOCKED}
                    onPress={handleButton}
                    icon={renderButtonIcon()}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    chapterTitle: {
        fontSize: 48,
        textAlign: 'center',
    },
    status: {
        fontSize: 24,
        textAlign: 'center',
    },
    imageContainer: {
        flex: 1,
    },
    cButton: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cTitle: {
        marginHorizontal: '5%'
    }
});
