import { axiosClient } from "../../../api/axios";

const StudentApi = {
create: async (fromaData) => {
return await axiosClient.post('/admin/users', fromaData);
},



update: async (id , fromaData) => {
return await axiosClient.put(`/admin/users/${id}`, fromaData);
},

delete: async (id) => {
return await axiosClient.delete(`/admin/users/${id}`);
},




all: async () => {
return await axiosClient.get('/admin/users');
},

nbStudent : async() =>{
    return await axiosClient.get('/admin/stats/students');
},
allT: async () => {
return await axiosClient.get('/teacher/users');
}


}

export default StudentApi;