import axios from "axios";
import { Base, GenreResponse, GetGenreResponse, MangaDoc, MangaResponse, MangaResponse2, MangaResponseData } from "../constrants/apiResponse";
import { API_BASE_URL } from "./apiService";

interface PaginationParams {
    page?: number;
    limit?: number;
    filter?: string;
}

// Function to build query parameters dynamically
function buildQueryParams(params: PaginationParams): string {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.filter) queryParams.append("filter", params.filter);

    return queryParams.toString();
}

async function getTotalManga(): Promise<Base<number>> {
    const response = await axios.get<Base<number>>(`${API_BASE_URL}/manga/total-manga`);
    return response.data;
}
async function getTotalUser(): Promise<Base<number>> {
    const response = await axios.get<Base<number>>(`${API_BASE_URL}/users/total-user`);
    return response.data;
}
async function getTotalGenre(): Promise<Base<number>> {
    const response = await axios.get<Base<number>>(`${API_BASE_URL}/genres/total-genre`);
    return response.data;
}
async function getStatisticsView(): Promise<Base<MangaResponse>> {
    const response = await axios.get<Base<MangaResponse>>(`${API_BASE_URL}/manga/statistics-view`);
    return response.data;
}
async function getStatisticsRating(): Promise<Base<MangaResponse2>> {
    const response = await axios.get<Base<MangaResponse2>>(`${API_BASE_URL}/manga/statistics-rating`);
    return response.data;
}

export default {
    getTotalManga,
    getTotalUser,
    getTotalGenre,
    getStatisticsView,
    getStatisticsRating
}