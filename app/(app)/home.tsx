import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LoadingScreen } from '@/shared/components';
import { Chapter } from '@/shared/components/chapters/Chapter.component';
import { useAuthStore } from '@/shared/context/authStore.context';
import { useGetChapters } from '@/shared/hooks';
import { colors } from '@/shared/styles/design.system';
import { EProgressStatus } from '@/shared/types/enums';
import { IChapterUser } from '@/shared/types/types';
import { useEffect } from 'react';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
    const { data: chapters, isPending } = useGetChapters();

    const { accessToken } = useAuthStore();

    let activeIndex: number = chapters
        ? chapters.findIndex(
              (chapter: IChapterUser) => chapter.status === EProgressStatus.INPROGRESS,
          )
        : 0;
    if (activeIndex === -1) {
        activeIndex = 0;
    }
    const startPositionX = activeIndex * width;

    useEffect(() => {
        console.log(chapters);
        console.log('---accesstoken', accessToken);
    }, [chapters]);

    const renderChapters = () => {
        return (
            <ScrollView
                style={styles.cChapters}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                contentOffset={{ x: startPositionX, y: 0 }}
                horizontal={true}
                bounces={false}
            >
                {chapters &&
                    chapters.map((chapterUser: IChapterUser) => (
                        <Chapter key={chapterUser.uuid} chapterUser={chapterUser} />
                    ))}
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={styles.sHome} >
            {isPending && <LoadingScreen />}
            {!isPending && renderChapters()}
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
