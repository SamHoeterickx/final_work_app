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
            level
            email
        }
    }
`
