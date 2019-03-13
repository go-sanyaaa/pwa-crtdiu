import axios from 'axios'
import JwtService from '@/common/jwt.service'
import {API_URL} from "@/common/config";

const ApiService = {
    init() {
        axios.defaults.baseURL = API_URL;
    },

    setHeader() {
        axios.defaults.headers.common["Authorization"] = `Bearer ${JwtService.getToken()}`;
    },

    get(resource, slug = "") {
        return axios.get(`${resource}/${slug}`).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    query(resource, params) {
        return axios.get(resource, params).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    post(resource, params) {
        return axios.post(`${resource}`, params);
    }
}

export default ApiService;

export const NewsService = {
    query(params={}){
        return ApiService.query('wp/v2/posts',params)
            .catch(error => {
                throw new Error(`[RWV] ApiService ${error}`);
            });
    }
}