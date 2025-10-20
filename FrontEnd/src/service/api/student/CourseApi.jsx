import { axiosClient } from "../../../api/axios";

const CourseApi = {
create: async (fromaData) => {
return await axiosClient.post('/admin/courses', fromaData);
},



update: async (id , fromaData) => {
return await axiosClient.put(`/admin/courses/${id}`, fromaData);
},

delete: async (id) => {
return await axiosClient.delete(`/admin/courses/${id}`);
},


all: async () => {
return await axiosClient.get('/admin/courses');
},
allT: async () => {
return await axiosClient.get('/teacher/courses');
}


}

export default CourseApi;