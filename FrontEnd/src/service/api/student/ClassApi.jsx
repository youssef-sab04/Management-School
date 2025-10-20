import { axiosClient } from "../../../api/axios";

const ClassApi = {
create: async (fromaData) => {
return await axiosClient.post('/admin/classe', fromaData);
},



update: async (id , fromaData) => {
return await axiosClient.put(`/admin/classe/${id}`, fromaData);
},

delete: async (id) => {
return await axiosClient.delete(`/admin/classe/${id}`);
},


all: async () => {
return await axiosClient.get('/admin/classe');
},

allT: async () => {
return await axiosClient.get('/teacher/classe');
},

allTR: async () => {
return await axiosClient.get('/student/classe');
},

nbclasse : async() =>{
    return await axiosClient.get('/admin/stats/classe');
},


}

export default ClassApi;