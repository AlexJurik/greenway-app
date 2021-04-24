import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue';

const config: AxiosRequestConfig = {
    baseURL: `${process.env.VUE_APP_BASE_URL}`
}

const _axios: AxiosInstance = axios.create(config);


_axios.interceptors.response.use((response) => {
    return response;
}, (err) => {
    if (err.response?.status === 404) {
        throw new Error(`${err.config.url} not found`);
    }

    if (err.response?.status === 500) {
        throw new Error(`Internal server error`);
    }
    throw err;
})

Vue.use(VueAxios, _axios);