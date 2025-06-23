import axios from "axios";

const useApiInterceptor = () => {
    const baseUrl = import.meta.env.VITE_URL_BASE;
    const api = axios.create({ baseURL: baseUrl });

    api.interceptors.request.use(
        function (data) {
            return data;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        function (response) {
            return response;
            
        },
        function (error) {
            return Promise.reject(error);
        }
    );



    return api;
};

export default useApiInterceptor;