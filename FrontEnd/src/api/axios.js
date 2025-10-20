import axios from "axios";
 const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL+'/api' ,
    withCredentials: true,
    withXSRFToken : true
   
})

axiosClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
});

export { axiosClient };

// avant toute requette : Authorization: Bearer votre_token_ici
