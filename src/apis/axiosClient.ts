import axios from "axios";
import queryString from "query-string";
import { API_URL } from "../constrants/webInfo";

const axiosClient = axios.create({
    baseURL: API_URL.BASE_URL,
    paramsSerializer: params => queryString.stringify(params)
})


axiosClient.interceptors.request.use(async (config:any)=>
{
    config.headers = {
        Authorization :'',
        Accept: 'application/json',
        ...config.headers
    }


    return config
})


axiosClient.interceptors.response.use(res => {
    if(res.data && res.status >= 200 && res.status <= 210){
        return res.data
    }
    throw new Error('Lỗi rồi')
}, error =>{
    console.log(`Error api: " ${JSON.stringify(error)}}`)
    const messageError = {
        message:error.response.data.message,
        statusCode:error.response.data.statusCode
    }
    throw new Error(JSON.stringify(messageError))
})


export default axiosClient
