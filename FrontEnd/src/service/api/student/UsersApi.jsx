import { axiosClient } from "../../../api/axios";

const UserApi = {

    
getCsrfToken: async () => {
        return await axiosClient .get('/sanctum/csrf-cookie', {
            baseURL: import.meta.env.VITE_BACKEND_URL
        });
    },


login: async (email, password) => {

    return await axiosClient.post('/login', { email, password });
},

/*
getStudent: async () => {
   return await axiosClient.get('/student');
},

getTeacher: async () => {
   return await axiosClient.get('/teacher');
},

getAdmin: async () => {
   return await axiosClient.get('/admin');
},

getParent: async () => {
   return await axiosClient.get('/parent');
},
*/


getUser: async () => {
   return await axiosClient.get('/me');
},


log_out: async () => {
    return await axiosClient.post('/logout');
 }
}

export default UserApi;