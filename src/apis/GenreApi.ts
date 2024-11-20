import axios from "axios";
import { Base, GenreResponse, GetGenreResponse } from "../constrants/apiResponse";
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

// Modified getAllGenres function with dynamic parameters
async function getAllGenres(page = 1, limit = 100): Promise<Base<GetGenreResponse>> {
    const params = buildQueryParams({ page, limit, filter: "_id,name" });
    const response = await axios.get<Base<GetGenreResponse>>(`${API_BASE_URL}/genres/get-advanced-page?${params}`);
    return response.data;
}

// Modified getAll function with dynamic parameters
async function getAll(page = 1, limit = 100): Promise<Base<GenreResponse>> {
    const params = buildQueryParams({ page, limit, filter: "_id,name" });
    const response = await axios.get<Base<GenreResponse>>(`${API_BASE_URL}/genres/get-advanced-page?${params}`);
    return response.data;
}

async function add(genreName: string) {
    const slug = convertToSlug(genreName);
    const url = `${API_BASE_URL}/genres/create`;
    const response = await axios.post<any>(url,
        {
            name: genreName,
            slug: slug,
            isReturnNewData: true,
        }
    )
    return response;
}

async function update(genreName: string, id:string) {
    const slug = convertToSlug(genreName);
    const url = `${API_BASE_URL}/genres/update`;
    const response = await axios.put<any>(url,
        {
            id: id,
            name: genreName,
            slug: slug,
        }
    )
    console.log ("update", url);
    return response;
}
function convertToSlug(text: string): string {
    return text
      .toLowerCase() // Đổi tất cả thành chữ thường
      .normalize('NFD') // Tách ký tự chữ và dấu
      .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
      .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu gạch ngang
      .replace(/[^\w-]+/g, '') // Loại bỏ ký tự đặc biệt
      .replace(/-+/g, '-') // Xóa dấu gạch ngang thừa
      .replace(/^-+|-+$/g, ''); // Xóa dấu gạch ngang ở đầu và cuối chuỗi
  }
async function deleteGenres(genresIsdeleted: boolean, id: string) {
    const url = `${API_BASE_URL}/genres/update?id=${id}`;
    const response = await axios.put<any>(url,
        {
            isReturnNewData: true,
            isDeleted: genresIsdeleted,
        }
    )
    console.log ("delete", url);
    return response;
}


export default {
    getAllGenres,
    getAll,
    update,
    deleteGenres,
    add
}