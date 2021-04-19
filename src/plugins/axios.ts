import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue';

const config: AxiosRequestConfig = {
    baseURL: `${process.env.VUE_APP_BASE_URL}`
}

const _axios: AxiosInstance = axios.create(config);

Vue.use(VueAxios, _axios);