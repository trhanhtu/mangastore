import axiosClient from "./axiosClient"

class ApiHandler {
    execute = async (
        endpoint: string,
        url:string,
        data?:any,
        method?: 'get' | 'post' | 'put' | 'delete'
    ) => {
        const response = await axiosClient(`/${endpoint}/${url}`,{
            method: method ?? 'get',
            data, withCredentials: true
        })
        return response;
    }   
}

export default new ApiHandler()