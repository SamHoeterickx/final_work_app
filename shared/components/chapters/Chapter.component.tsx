import { EProgressStatus, ESvgIconName, IChapterProps } from "@/shared/types/types";
import { FC } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SvgIcon } from "../SvgIcon.component";
import { baseStyles, spacing } from "@/shared/styles/design.system";
import { Button } from "../buttons/Button.component";

const { width } = Dimensions.get('window');

export const Chapter: FC<IChapterProps> = ({ chapterUser }) => {


    const renderStatus = () => {
        if(chapterUser.status === EProgressStatus.LOCKED){
            return (
                <View>
                    <Text style={[baseStyles.h3, styles.status]}>Locked</Text>
                    <SvgIcon name="locked" />
                </View>
            )
        }else {
            const allLessons = chapterUser.chapter.lessons || [];
            const completed = allLessons.filter(lesson => lesson.status !== EProgressStatus.LOCKED);
            return (
                <Text style={[baseStyles.h3, styles.status]}>{`${completed.length} / ${allLessons.length}`}</Text>
            )
        }
    }

    const renderButtonCopy = () => {
        switch(chapterUser.status) {
            case EProgressStatus.LOCKED:
                return 'chapter.buttons.locked'
            case EProgressStatus.UNLOCKED:
                return 'chapter.buttons.start'
            case EProgressStatus.INPROGRESS:
                return 'chapter.buttons.continue'
            case EProgressStatus.COMPLETED:
                return 'chapter.buttons.completed'
        }
    }

    const renderButtonIcon = () => {
        switch(chapterUser.status) {
            case EProgressStatus.LOCKED:
                return ESvgIconName.LOCKED
            case EProgressStatus.UNLOCKED:
                return ESvgIconName.ARROW_LEFT_FULL
            case EProgressStatus.INPROGRESS:
                return ESvgIconName.ARROW_LEFT_FULL
            case EProgressStatus.COMPLETED:
                return ESvgIconName.ARROW_LEFT_FULL
        }
    }

    const handleButton = () => {
        console.log('pressed')
    }

    return (
        <View
            key={chapterUser.chapter.uuid}
            style={styles.wChapter}
        >
            <View>
                <Text style={[baseStyles.h2, styles.chapterTitle]}>{chapterUser.chapter.name}</Text>
                {renderStatus()}
            </View>
            <Button 
                copy={renderButtonCopy()}
                disabled={chapterUser.status === EProgressStatus.LOCKED}
                onPress={handleButton}
                icon={renderButtonIcon()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wChapter: {
        width: width,
        marginTop: spacing.xxl,
        height: '100%',
        alignItems: 'center'
    },
    chapterTitle: {
        fontSize: 48,
        textAlign: 'center'
    },
    status: {
        fontSize: 24,
        textAlign: 'center'
    }
})