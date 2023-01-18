import axios from 'axios';

let first_try = true;
const OMITTED_URLS= ['/login']

export const axiosApiInstance = axios.create({
    baseURL: 'http://localhost:3000/', //process.env.REACT_APP_API_URL
    validateStatus: function (status) {
        return status >= 200 && status < 300; // default
    },
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
    async (config: any) => {
        const token = localStorage.getItem('accessToken');
        if (token && OMITTED_URLS.indexOf(config.url) < 0)
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'X-STELLAPPS-CLIENT': sessionStorage.getItem('clientId'),
                'Accept-Language': 'en',
            }
        return config;
    },
    (error: any) => {
        throw error
    });

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response: any) => {
    if (response.response == 200) {
        first_try = true;

    }
    return response
}, async function (error: any) {
    if (error.response) {
        if (error.response.status === 401) {
           localStorage.removeItem('accessToken');
        }
        throw (error);
    }
    if (error.request) {
        console.log(error.message);
        throw error.message
    } else {
        console.log(error.message);
        throw error.message
    }
});
