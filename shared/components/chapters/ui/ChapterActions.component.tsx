import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

// COMPONENTS
import { Button } from '../../buttons/Button.component';

// CONTEXT
import { useHomeStore } from '@/shared/context/homeStore.context';

// TYPES
import { EProgressStatus, ESvgIconName } from '@/shared/types/enums';
import { IChapterActionsProps } from '@/shared/types/types';

export const ChapterActions: FC<IChapterActionsProps> = ({ status, isFocused, onPress }) => {
    const isScreenActive = useHomeStore((state) => state.isScreenActive);

    const renderButtonCopy = () => {
        if (!isFocused) {
            switch (status) {
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

        if (isFocused) {
            switch (status) {
                case EProgressStatus.LOCKED:
                    return 'chapterLesson.buttons.locked';
                case EProgressStatus.UNLOCKED:
                    return 'chapterLesson.buttons.start';
                case EProgressStatus.INPROGRESS:
                    return 'chapterLesson.buttons.start';
                case EProgressStatus.COMPLETED:
                    return 'chapterLesson.buttons.completed';
            }
        }

        return 'continue';
    };

    const renderButtonIcon = () => {
        if (status === EProgressStatus.LOCKED) {
            return ESvgIconName.LOCKED;
        }
        return ESvgIconName.ARROW_LEFT_FULL;
    };

    const renderButton = () => {
        return (
            <View style={styles.cButton}>
                <Button
                    copy={renderButtonCopy()}
                    disabled={status === EProgressStatus.LOCKED}
                    onPress={onPress}
                    icon={renderButtonIcon()}
                />
            </View>
        );
    };

    return <>{isScreenActive && renderButton()}</>;
};

const styles = StyleSheet.create({
    cButton: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
