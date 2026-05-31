import { create } from 'zustand';
import { EProgressStatus } from '../types/enums';
import { IGetMyChaptersResponse } from '../types/response.type';
import { IHomeStore } from '../types/types';

export const useHomeStore = create<IHomeStore>((set) => ({
    allChapters: null,
    chapterIndex: 0,
    activeChapterIndex: 0,
    aChapterStatus: null,
    returnToCurrentChapter: () =>
        set((state) => {
            const currentChapter = state.allChapters?.[state.chapterIndex];
            return {
                activeChapterIndex: state.chapterIndex,
                aChapterStatus: currentChapter ? currentChapter.status : null,
            };
        }),
    updateChapterIndex: (newActiveIndex: number) =>
        set((state) => {
            const chapter = state.allChapters?.[newActiveIndex];
            return {
                activeChapterIndex: newActiveIndex,
                aChapterStatus: chapter ? chapter.status : null,
            };
        }),
    setAllChapters: (chapters: IGetMyChaptersResponse[]) => {
        const cIndex = chapters.findIndex(
            (chapter) =>
                chapter.status === EProgressStatus.INPROGRESS ||
                chapter.status === EProgressStatus.UNLOCKED,
        );
        const validIndex = cIndex !== -1 ? cIndex : 0;
        set({
            allChapters: chapters,
            chapterIndex: validIndex,
            activeChapterIndex: validIndex,
            aChapterStatus: chapters[validIndex]?.status || null,
        });
    },
}));
