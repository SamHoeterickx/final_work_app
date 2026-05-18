export const GET_CHAPTERS_QUERY = `
    query GetMyChapters {
        getMyChapters {
            created_at
            order
            status
            uuid
            chapter {
                created_at
                description
                name
                tags
                slug
                uuid
                lessons {
                    uuid
                    status
                    name
                    order
                    description
                }
            }
        }
    }

`;

export const GET_USER_DATA_QUERY = `
    query GetUserData {
        getUserData {
            role
            name
            email
        }
    }
`;
export const START_LESSON_QUERY = `
    query StartLesson($lessonUuid: String!) {
        startLesson(input: { 
            lessonUuid: $lessonUuid
        }) {
            content
            created_at
            description
            estimatedDuration
            name
            order
            status
            uuid
            xp
            chapter {
                created_at
                description
                name
                slug
                tags
                uuid
                lessons {
                    content
                    created_at
                    description
                    estimatedDuration
                    name
                    order
                    status
                    uuid
                    xp
                }
            }
        }
    }

`;

export const GET_PREFERENCE_LANGUAGE = `    
    query GetPreferenceLanguage {
        getPreferenceLanguage
    }
`;
