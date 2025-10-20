import { axiosClient } from "../../../api/axios";

const TeacherApi = {
create: async (fromaData) => {
return await axiosClient.post('/admin/teachers', fromaData);
},

update: async (id , fromaData) => {
return await axiosClient.put(`/admin/teachers/${id}`, fromaData);
},

delete: async (id) => {
return await axiosClient.delete(`/admin/teachers/${id}`);
},

all: async () => {
return await axiosClient.get('/admin/teachers');
},

nbteachers: async() =>{
    return await axiosClient.get('/admin/stats/teachers');
},

allT: async () => {
return await axiosClient.get('/teacher/teachers');
},

allTR: async () => {
return await axiosClient.get('/student/teachers');
}


}

export default TeacherApi;