export const GET_ALL_CHAPTERS = `
    query GetAllChapters {
        getAllChapters {
            name
            lessons {
                name
                isCompleted
                isUnlocked
            }
        }
    }
`;
