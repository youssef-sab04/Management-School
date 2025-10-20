import { axiosClient } from "../../../api/axios";

const ExamApi = {
create: async (fromaData) => {
return await axiosClient.post('/teacher/exam', fromaData);
},

update: async (id , fromaData) => {
return await axiosClient.put(`/teacher/exam/${id}`, fromaData);
},

delete: async (id) => {
return await axiosClient.delete(`/teacher/exam/${id}`);
},

all: async () => {
return await axiosClient.get('/teacher/exam');
}


}

export default ExamApi;