import instance from "./api";
import { statuses } from "./statusesConsts";

const usersAPI = {
  fetchUsers: async () => {
    const response = await instance.get(`users`);
    
    if (response.status === statuses.get.SUCCESS) {
      return response.data;
    }
    if (response.status === statuses.get.ERROR) {
      return console.error(`Error while ${usersAPI.fetchUsers}`);
    }
  },
  addUser: async (formBody) => {
    const response = await instance.post(`users`, formBody);

    if (response.status === statuses.post.SUCCESS) {
      return response.data;
    }
    if (response.status === statuses.post.ERROR) {
      return console.error(`Error while ${usersAPI.addUser}`);
    }
  },
  deleteUser: async (userId) => {
    const response = await instance.delete(`users/${userId}`);

    if (response.status === statuses.delete.SUCCESS) {
      return { response: response.data, userId: userId };
    }
    if (response.status === statuses.delete.ERROR) {
      return console.error(`Error while ${usersAPI.deleteUser}`);
    }
  },
  changeUserName: async (userId, value) => {
     // jsonplaceholder can't edit user that we created because it doesn't have our new user in theirs datatbase
    if (userId < 11) {
      const response = await instance.put(`users/${userId}?name=${value}`);

      if (response.status === statuses.put.SUCCESS) {
        return { response: response.data, userId: userId, value: value };
      }
      if (response.status === statuses.put.ERROR) {
        return console.error(`Error while ${usersAPI.changeUserName}`);
      }
    } else {
      return { userId: userId, value: value };
    }
  },
};

export default usersAPI;
