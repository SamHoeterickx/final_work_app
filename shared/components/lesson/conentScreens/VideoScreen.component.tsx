import { ResizeMode, Video } from 'expo-av';
import { FC, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

// STYLES
import { baseStyles, spacing } from '@/shared/styles/design.system';

// TYPES
import { ILessonScreenProps } from '@/shared/types/types';

const VIDEO_ASSETS: Record<string, any> = {
    moka_pot_explained: require('@/assets/videos/moka_pot_explained.mp4'),
};

const { width, height } = Dimensions.get('window');

export const VideoScreen: FC<ILessonScreenProps> = ({ content }) => {
    const videoRef = useRef<Video>(null);

    const videoSource =
        content.path && VIDEO_ASSETS[content.path]
            ? VIDEO_ASSETS[content.path]
            : {
                  uri: `https://raw.githubusercontent.com/SamHoeterickx/BREWLINGO_public/refs/heads/main/videos/${content.path}.mp4`,
              };

    return (
        <View style={styles.wrapper}>
            {content.title && <Text style={[baseStyles.h2, styles.title]}>{content.title}</Text>}

            <View style={styles.cVideo}>
                <Video
                    ref={videoRef}
                    source={videoSource}
                    style={styles.video}
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay
                    isLooping
                    isMuted
                    useNativeControls={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: spacing.sm,
        position: 'relative'
    },
    title: {
        textAlign: 'center',
        width: '100%',
        marginBottom: spacing.xl,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    cVideo: {
        position: 'absolute',
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: width - spacing.sm * 2,
    },
});
