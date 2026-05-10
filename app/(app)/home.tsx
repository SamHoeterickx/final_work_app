// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Button, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// STORE
// import { useAuthStore } from '@/shared/context/authStore.context';

import { LoadingScreen } from '@/shared/components';
import { Chapter } from '@/shared/components/chapters/Chapter.component';
import { useAuthStore } from '@/shared/context/authStore.context';
import { useGetChapters } from '@/shared/hooks';
import { IChapterUser } from '@/shared/types/types';
import { EProgressStatus } from '@/shared/types/enums';
import { useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';

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
        <SafeAreaView style={{ flex: 1 }}>
            {isPending && <LoadingScreen />}
            {!isPending && renderChapters()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    cChapters: {
        flex: 1,
    },
});
