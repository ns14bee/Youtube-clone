import axios from 'axios'
const url = process.env.VUE_APP_URL;
import store from '../store/store.js';
store.getters.config;

export default () => {
    const axiosInstance = axios.create({
        baseURL: url
    });
    let token = store.getters['auth/getToken'];
    if(token){
        axiosInstance.defaults.headers.common['x-access-token']  = token;
    }

    // axiosInstance.interceptors.response.use(
    //     (response) => response,
    //     (error) => {
    //         if(error.response.status === 401){
    //             // store.dispatch('auth/signOut');
    //         }
    //         return Promise.reject(error);
    //     }
    // );
    return axiosInstance;
}