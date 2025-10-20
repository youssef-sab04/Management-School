import { axiosClient } from "../../../api/axios";

const ExamRecordApi = {
create: async (fromaData) => {
return await axiosClient.post('/teacher/examsRecord', fromaData);
},

update: async (id , fromaData) => {
return await axiosClient.put(`/teacher/examsRecord/${id}`, fromaData);
},

delete: async (id) => {
return await axiosClient.delete(`/teacher/examsRecord/${id}`);
},

all: async () => {
return await axiosClient.get('/teacher/examsRecord');
},

records: async () => {
return await axiosClient.get('/admin/stats/records');
},

GetRecord: async (id) => {
return await axiosClient.get(`/student/note/${id}`);
},



}

export default ExamRecordApi;