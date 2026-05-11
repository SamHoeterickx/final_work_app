export const GET_CHAPTERS = `
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
                }
            }
        }
    }

`;
