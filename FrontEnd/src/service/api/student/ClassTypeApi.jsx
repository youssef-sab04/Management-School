import { axiosClient } from "../../../api/axios";

const ClassTypeApi = {
create: async (fromaData) => {
return await axiosClient.post('/admin/classesT', fromaData);
},



update: async (id , fromaData) => {
return await axiosClient.put(`/admin/classesT/${id}`, fromaData);
},

delete: async (id) => {
return await axiosClient.delete(`/admin/classesT/${id}`);
},


all: async () => {
return await axiosClient.get('/admin/classesT');
},

allT: async () => {
return await axiosClient.get('/teacher/classesT');
},
nbclassType : async() =>{
    return await axiosClient.get('/admin/stats/classesT');
},

}

export default ClassTypeApi;