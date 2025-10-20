import { axiosClient } from "../../../api/axios";

const ContenuCoursApi = {
create: async (fromaData) => {
return await axiosClient.post('/teacher/contenuCours', fromaData);
},



update: async (id , fromaData) => {
return await axiosClient.put(`/teacher/contenuCours/${id}`, fromaData);
},

delete: async (id) => {
return await axiosClient.delete(`/teacher/contenuCours/${id}`);
},


all: async () => {
return await axiosClient.get('/teacher/contenuCours');
}


}

export default ContenuCoursApi;