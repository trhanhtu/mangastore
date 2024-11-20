

import axios, { AxiosResponse } from 'axios';
import { Base, DTOManga, MangaResponseData, SelectedManga, UpdateMangaData } from '../constrants/apiResponse';
import { API_BASE_URL } from './apiService';


const MANGA_API_URL = API_BASE_URL + "/manga"


interface QueryParams {
    [key: string]: string | number | undefined;
}

function buildQuery(params?: QueryParams): string {
    if (!params) return '';
    const queryString = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
        .join('&');
    return queryString ? `?${queryString}` : '';
}

async function getAllManga(params?: QueryParams): Promise<Base<MangaResponseData>> {
    const query = buildQuery(params);
    const url = `${MANGA_API_URL}/get-all-admin${query}`;
    const response = await axios.get<Base<MangaResponseData>>(url);

    return response.data;
}
// Update manga by ID
async function updateMangaById(data: UpdateMangaData): Promise<AxiosResponse<Base<DTOManga>>> {
    const url = `${MANGA_API_URL}`;
    return axios.put<Base<DTOManga>>(url, data);
}

async function createManga(data: DTOManga): Promise<AxiosResponse<Base<DTOManga>>> {
    const url = `${MANGA_API_URL}/create-manga`;
    return axios.post<Base<DTOManga>>(url, data);
}
// Delete manga by ID
async function deleteManga(idManga: string): Promise<AxiosResponse<Base<DTOManga>>> {
    const url = `${MANGA_API_URL}/delete-manga`;
    return axios.put<Base<DTOManga>>(url, {
        idManga,
    });
}

async function updateManga(manga: SelectedManga) {
    const url = `${MANGA_API_URL}/update-by-id`;
    const response = await axios.put<any>(url, {
        _id: manga._id,
        updatedData: {
            name: manga.name,
            summary: manga.summary,
            imageUrl: manga.imageUrl,
            genres: manga.genres.map((theloai) => theloai._id)
        }
    });
    return response;
}


async function addManga(manga: SelectedManga) {
    const url = `${MANGA_API_URL}/create-manga`;
    const response = await axios.post<any>(url,
        {
            name: manga.name,
            imageUrl: manga.imageUrl,
            summary: manga.summary,
            author: ["66f1812835029f5058744e9c"],
            publisher: "66f1812835029f5058744e9c",
            publish_date: new Date(),
            status: 1,
            genres: manga.genres.map((theloai) => theloai._id)

        }
    )
    return response;
}
const handleDeleteManga = async (idManga: string, setRow: React.Dispatch<React.SetStateAction<DTOManga[]>>) => {
    try {
        await deleteManga(idManga);

        // Update the local state for soft deletion
        setRow((prevRows) =>
            prevRows.map((manga) =>
                manga._id === idManga ? { ...manga, isDeleted: true } : manga
            )
        );
    } catch (error) {
        console.error('Error deleting manga:', error);
    }
};



export default {
    getAllManga,
    updateMangaById,
    createManga,
    deleteManga,
    updateManga,
    handleDeleteManga ,
    addManga
}