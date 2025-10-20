import { axiosClient } from "../../../api/axios";

const ClassTypeCourseApi = {
create: async (fromaData) => {
return await axiosClient.post('/admin/classtype_courses', fromaData);
},



update: async (id , fromaData) => {
return await axiosClient.put(`/admin/classtype_courses/${id}`, fromaData);
},

delete: async (id) => {
return await axiosClient.delete(`/admin/classtype_courses/${id}`);
},


all: async () => {
return await axiosClient.get('/admin/classtype_courses');
},

allT: async () => {
return await axiosClient.get('/teacher/classtype_courses');
}


}

export default ClassTypeCourseApi;