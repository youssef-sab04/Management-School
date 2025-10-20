import { axiosClient } from "../../../api/axios";

const ContactApi = {
create: async (fromaData) => {
return await axiosClient.post('/contact', fromaData);
},



}

export default ContactApi;