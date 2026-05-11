import { Canvas } from '@react-three/fiber/native';
import { FC } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

// COMPONENTS
import { Button, SvgIcon } from '../index';

// STYLES
import { baseStyles } from '@/shared/styles/design.system';

// TYPES
import { EProgressStatus, ESvgIconName } from '@/shared/types/enums';
import { IChapterProps } from '@/shared/types/types';

export const Chapter: FC<IChapterProps & { slideAnim?: Animated.Value }> = ({
    chapterUser,
    slideAnim,
}) => {
    const renderStatus = () => {
        if (chapterUser.status === EProgressStatus.LOCKED) {
            return (
                <View>
                    <Text style={[baseStyles.h3, styles.status]}>Locked</Text>
                    <SvgIcon name="locked" />
                </View>
            );
        } else {
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

    const handleButton = () => {
        console.log('pressed');
    };

    return (
        <>
            <View>
                <Text style={[baseStyles.h2, styles.chapterTitle]}>{chapterUser.chapter.name}</Text>
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
                        position: [-2, 2.5, 5],
                        fov: 30,
                    }}
                >
                    <mesh>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshBasicMaterial color="darkgreen" />
                    </mesh>
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
});
