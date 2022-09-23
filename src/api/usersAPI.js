import instance from "./api";
import { statuses } from "./statusesConsts";

const usersAPI = {
  fetchUsers: async() => {
    const response = await instance.get(`users`);
    
    if (response.status === statuses.SUCCESS) {
      return response.data;
    }
  },
};

export default usersAPI;
