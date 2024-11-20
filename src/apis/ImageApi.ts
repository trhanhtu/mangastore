import axios, { AxiosResponse } from 'axios';
import { Base, Chapter, ChapterData, ImageData } from '../constrants/apiResponse';
import { API_BASE_URL } from './apiService';

const CHAPTER_API_URL = `${API_BASE_URL}/chapters`;

// Define the query parameters for fetching paginated chapters
interface ChapterQueryParams {
    chapterId: string;
    
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

async function read(chapterId: string): Promise<Base<ImageData>> {
    if (!chapterId) {
        throw new Error("Chapter ID is required to fetch images.");
    }

    const url = `${API_BASE_URL}/chapters/read?chapterId=${chapterId}`;
    
    try {
        const response = await axios.get<Base<ImageData>>(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}

async function append(chapterId: string, imageLink: string): Promise<Base<any>> {
    if (!chapterId) {
        throw new Error("Chapter ID is required to fetch images.");
    }

    const url = `${API_BASE_URL}/chapters/appendImageLink`;
    
    try {
        const response = await axios.post<Base<any>>(url,
            {
                chapterId: chapterId,
                imageLinks: imageLink,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}
async function deleteImage(chapterId: string, pos: number): Promise<Base<any>> {
    if (!chapterId) {
        throw new Error("Chapter ID is required to fetch images.");
    }

    const url = `${API_BASE_URL}/chapters/removeImageLink`;
    
    try {
        const response = await axios.post<Base<any>>(url,
            {
                chapterId: chapterId,
                pos: pos,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}
async function insert(chapterId: string, imageLink: string, pos: number): Promise<Base<any>> {
    if (!chapterId) {
        throw new Error("Chapter ID is required to fetch images.");
    }

    const url = `${API_BASE_URL}/chapters/insertImageLink`;
    
    try {
        const response = await axios.post<Base<any>>(url,
            {
                chapterId: chapterId,
                imageLinks: imageLink,
                pos: pos
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}

export default {
    read,
    append,
    deleteImage,
    insert
};
