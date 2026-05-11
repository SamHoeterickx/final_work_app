import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTS
import { LoadingScreen } from '@/shared/components';
import { Chapter } from '@/shared/components/chapters/Chapter.component';

// HOOKS
import { useGetChapters, useSwipe } from '@/shared/hooks';

// STYLES
import { colors, spacing } from '@/shared/styles/design.system';

// TYPES
import { EProgressStatus } from '@/shared/types/enums';
import { IChapterUser } from '@/shared/types/types';

const { width } = Dimensions.get('window');


export default function HomeScreen() {
    const [currentChapterIndex, setCurrentChapterIndex] = useState<number | null>(null);
    
    const { data: userChapters, isPending } = useGetChapters();
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6)
    
    useEffect(() => {
        if(!userChapters) return
        
        userChapters.forEach((userChapter: IChapterUser, index: number) => {
            if(userChapter.status === EProgressStatus.INPROGRESS || userChapter.status === EProgressStatus.UNLOCKED){
                setCurrentChapterIndex(index);
            }
        })
    }, [userChapters]);
    
    
    function onSwipeLeft() {
        if (currentChapterIndex === null || currentChapterIndex <= 0) return;
        setCurrentChapterIndex((prev) => (prev !== null ? prev - 1 : null));
    }

    function onSwipeRight() {
        if (currentChapterIndex === null || currentChapterIndex >= userChapters.length - 1) return;
        setCurrentChapterIndex((prev) => (prev !== null ? prev + 1 : null));
    }
    
    return (
        <SafeAreaView style={styles.sHome} >
            {isPending && <LoadingScreen />}
            <ScrollView 
                contentContainerStyle={styles.wChapter}    
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                scrollEnabled={false}
            >
                {!isPending && currentChapterIndex !== null && userChapters && <Chapter chapterUser={userChapters[currentChapterIndex]} />}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sHome: {
        backgroundColor: colors.background,
        flex: 1,
    },
    cChapters: {
        flex: 1,
    },
    wChapter: {
        width: width,
        marginTop: spacing.xxl,
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
});
