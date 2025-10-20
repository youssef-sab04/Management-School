import { axiosClient } from "../../../api/axios";

const ParentApi = {
create: async (fromaData) => {
return await axiosClient.post('/admin/parents', fromaData);
},

update: async (id , fromaData) => {
return await axiosClient.put(`/admin/parents/${id}`, fromaData);
},

delete: async (id) => {
return await axiosClient.delete(`/admin/parents/${id}`);
},

all: async () => {
return await axiosClient.get('/admin/parents');
},

nbparents: async() =>{
    return await axiosClient.get('/admin/stats/parents');
},
allT: async () => {
return await axiosClient.get('/teacher/parents');
}

}

export default ParentApi;