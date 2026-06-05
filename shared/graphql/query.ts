export const GET_CHAPTERS_QUERY = `
    query GetMyChapters {
        getMyChapters {
            uuid
            order
            status
            chapter {
                uuid
                name
                description
                tags
                slug
                lessons {
                    uuid
                    status
                    order
                    translations {
                        name
                        description
                        languageCode
                        content
                    }
                }
            }
            created_at
        }
    }
`;

export const GET_USER_DATA_QUERY = `
    query GetUserData {
        getUserData {
            role
            name
            email
            xp
            streaks {
                uuid
                currentStreak
                lastCompletedDate
                longestStreak
            }
        }
    }
`;

export const START_LESSON_QUERY = `
    query StartLesson(
        $lessonUuid: String!,
        $languageCode: String!
    ) {
        startLesson(input: { 
            lessonUuid: $lessonUuid,
            languageCode: $languageCode
        }) {
            estimatedDuration
            order
            uuid
            xp
            content {
                content
                description
                languageCode
                name
                uuid
            }
        }
    }

`;

export const GET_PREFERENCE_LANGUAGE = `    
    query GetPreferenceLanguage {
        getPreferenceLanguage
    }
`;
