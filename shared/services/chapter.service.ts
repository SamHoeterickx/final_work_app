import { GET_CHAPTERS } from "../graphql/query";
import { graphqlFetch } from "../utils/api.utils";

class ChapterService {
    async getMyChapters() {
        try{
            const response = await graphqlFetch<any>(GET_CHAPTERS);
            console.log(response)

            const chapters = response?.getMyChapters;
            return chapters || [];
        }catch(error){
            throw error;
        }
    };
}
export const chapterService = new ChapterService();