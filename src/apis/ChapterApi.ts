import axios, { AxiosResponse } from 'axios';
import { Base, Chapter, ChapterData, ImageData } from '../constrants/apiResponse';
import { API_BASE_URL } from './apiService';

const CHAPTER_API_URL = `${API_BASE_URL}/chapters`;
axios.defaults.withCredentials = true;
// Define the query parameters for fetching paginated chapters
interface ChapterQueryParams {
    mangaId: string;
    filter?: string;
    page?: number;
    limit?: number;
}

// Build query string from parameters
function buildChapterQuery(params?: ChapterQueryParams): string {
    if (!params) return '';
    const queryString = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
        .join('&');
    return queryString ? `?${queryString}` : '';
}

// Fetch paginated chapters for a specific manga
async function getPaginatedChapters(params: ChapterQueryParams): Promise<Base<ChapterData>> {
    if (!params.mangaId) {
        throw new Error("mangaId is required to fetch chapters.");
    }
    
    const query = buildChapterQuery(params);
    const url = `${CHAPTER_API_URL}/get-advanced-page${query}`;
    
    try {
        const response = await axios.get<Base<ChapterData>>(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching chapters:", error);
        throw error;
    }
}
async function addChapter(chapterTitle: string, mangaId: string) {
    if (!mangaId) {
        throw new Error("mangaId is required to fetch chapters.");
        
    }
    console.log("chapter",chapterTitle)
    const url = `${CHAPTER_API_URL}/append`;
    const response = await axios.post<any>(url,
        {
            title: chapterTitle,
            manga: mangaId
        }
    )
    
    return response;
}
async function updateChapter(chapterTitle: string, chapterId: string) {
    const url = `${CHAPTER_API_URL}/update?id=${chapterId}`;
    const response = await axios.put<any>(url,
        {
            title: chapterTitle,
        }
    )
    console.log ("update", url);
    return response;
}
async function deleteChapter(chapterIsdeleted: boolean, chapterId: string) {
    const url = `${CHAPTER_API_URL}/update?id=${chapterId}`;
    const response = await axios.put<any>(url,
        {
            isReturnNewData: true,
            isDeleted: chapterIsdeleted,
        }
    )
    console.log ("delete", url);
    return response;
}




export default {
    getPaginatedChapters,
    updateChapter,
    deleteChapter,
    addChapter
};
