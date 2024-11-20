// src/services/apiService.ts

import axios, { AxiosResponse } from 'axios';
import { Base, DTOManga, MangaResponseData, UpdateMangaData, UserDTO } from '../constrants/apiResponse';


export const API_BASE_URL = 'https://researchdevzone.azurewebsites.net'; // Replace with your API base URL
interface QueryParams {
  [key: string]: string | number | undefined;
}
class ApiService<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${API_BASE_URL}/${endpoint}`;
  }

  // Helper to build query parameters
  private buildQuery(params?: QueryParams): string {
    if (!params) return '';
    const queryString = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
      .join('&');
    return queryString ? `?${queryString}` : '';
  }

  

  // Read all resources
  async getAllUser(suffix?: string): Promise<AxiosResponse<T>> {
    return axios.get<T>(`${this.endpoint}${suffix ? `/${suffix}` : ''}`);
  }


  // Delete  by ID
  async deleteUser(idUser: string): Promise<AxiosResponse<Base<UserDTO>>> {
    const url = `${API_BASE_URL}/users/block-user`;
    return axios.put<Base<UserDTO>>(url, {
      idUser: idUser ,
        
    });
}
  async getAllManga(params?: QueryParams): Promise<AxiosResponse<Base<MangaResponseData>>> {
    const query = this.buildQuery(params);
    const url = `${this.endpoint}${query}`;
    return axios.get<Base<MangaResponseData>>(url);
  }
  // Update manga by ID
  async updateMangaById(data: UpdateMangaData): Promise<AxiosResponse<Base<DTOManga>>> {
    const url = `${this.endpoint}`;
    return axios.put<Base<DTOManga>>(url, data);
  }

  // Create a new manga
  async createManga(data: DTOManga): Promise<AxiosResponse<Base<DTOManga>>> {
    const url = `${this.endpoint}/create-manga`;
    return axios.post<Base<DTOManga>>(url, data);
  }
  // Delete manga by ID
  async deleteManga(idManga: string): Promise<AxiosResponse<Base<DTOManga>>> {
    const url = `${this.endpoint}/delete-manga`;
    return axios.delete<Base<DTOManga>>(url, {
      data: { idManga },
    });
  }
}

export default ApiService;
