import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

// COMPONENTS
import { Chapter } from '@/shared/components/chapters/Chapter.component';
import { LoadingScreen } from '@/shared/components';

// HOOKS
import { useGetChapters } from '@/shared/hooks';

// STYLES
import { colors } from '@/shared/styles/design.system';

// TYPES
import { EProgressStatus } from '@/shared/types/enums';
import { IChapterUser } from '@/shared/types/types';

export default function HomeScreen() {
    const [currentChapterIndex, setCurrentChapterIndex] = useState<number | null>(null);
    
    const { data: userChapters, isPending } = useGetChapters();

    useEffect(() => {
        if(!userChapters) return

        userChapters.forEach((userChapter: IChapterUser, index: number) => {
            if(userChapter.status === EProgressStatus.INPROGRESS || userChapter.status === EProgressStatus.UNLOCKED){
                setCurrentChapterIndex(1);
            }
        })
    }, [userChapters]);


    return (
        <SafeAreaView style={styles.sHome} >
            {isPending && <LoadingScreen />}
            {!isPending && currentChapterIndex && <Chapter chapterUser={userChapters[currentChapterIndex]} />}
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
});
