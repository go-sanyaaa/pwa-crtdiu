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

    get(resource, params = {}) {
        return axios.get(resource, params).catch(error => {
            throw new Error(`ApiService ${error}`);
        });
    },

    post(resource, params) {
        return axios.post(`${resource}`, params).catch(error => {
            throw new Error(`ApiService ${error}`);
        });
    },

    delete(resource,params) {
        return axios.delete(resource,params).catch(error => {
            throw new Error(`ApiService ${error}`);
        });
    }
}

export default ApiService;

export const NewsService = {
    query(params={}){
        return ApiService.get('wp/v2/posts','')
            .catch(error => {
                throw new Error(`[RWV] ApiService ${error}`);
            });
    }
}