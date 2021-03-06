import axios from 'axios'
import JwtService from './jwt.service'
import {API_URL} from "./config";

const ApiService = {
    init() {
        axios.defaults.baseURL = API_URL;
    },

    setHeader() {
        axios.defaults.headers.common["Authorization"] = `Bearer ${JwtService.getToken()}`;
    },

    get(resource, params = {}) {
        return axios.get(resource, {params})
    },

    post(resource, params) {
        return axios.post(resource, params)
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
        return ApiService.get('wp/v2/posts',params)
            .catch(error => {
                throw new Error(`ApiService ${error}`);
            });
    }
}