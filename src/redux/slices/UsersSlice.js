import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import usersAPI from "../../api/usersAPI";
import { HTTP_STATUSES } from "../htttpStatuses";

const namespace = "user";

export const fetchUsers = createAsyncThunk(`${namespace}/fetchUsers`, () =>
  usersAPI.fetchUsers()
);

export const addUser = createAsyncThunk(`${namespace}/addUser`, (formBody) =>
  usersAPI.addUser(formBody)
);

export const deleteUser = createAsyncThunk(
  `${namespace}/deleteUser`,
  (userId) => usersAPI.deleteUser(userId)
);

export const changeUserName = createAsyncThunk(
  `${namespace}/changeUserName`,
  ({ userId, value }) => usersAPI.changeUserName(userId, value)
);

const baseSelector = (state) => state.user;

export const getUsers = createSelector(baseSelector, (state) => state.userData);
export const getLoadingStatus = createSelector(
  baseSelector,
  (state) => state.loading
);

export const getErrorMessage = createSelector(
  baseSelector,
  (state) => state.erorMessage
);
export const getFilterQueries = createSelector(
  baseSelector,
  (state) => state.filterQueries
);
export const getFilteredUserData = createSelector(
  baseSelector,
  (state) => state.filteredUserData
);

const UsersSlice = createSlice({
  name: namespace,
  initialState: {
    loading: null,
    filterQueries: "",
    userData: JSON.parse(localStorage.getItem("users")) || [],
    filteredUserData: [],
    erorMessage: "",
  },
  reducers: {
    sortUser(state) {
      state.filteredUserData.length
        ? state.filteredUserData.reverse()
        : state.userData.reverse();
    },
    filterUser(state, { payload }) {
      state.filterQueries = payload;
      const searchQuery = payload.toLowerCase();
      state.filteredUserData = state.userData.filter(
        ({ name, email, phone }) => {
          return (
            name.toLowerCase().includes(searchQuery) ||
            email.toLowerCase().includes(searchQuery) ||
            phone.toLowerCase().includes(searchQuery)
          );
        }
      );
    },
  },
  extraReducers: {
    [fetchUsers.pending](state) {
      state.loading = HTTP_STATUSES.PENDING;
    },
    [fetchUsers.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUSES.FULFILLED;
      state.userData = payload;
    },
    [fetchUsers.rejected](state) {
      state.loading = HTTP_STATUSES.REJECTED;
      state.erorMessage = 'error'
    },
    [addUser.pending](state) {
      state.loading = HTTP_STATUSES.PENDING;
    },
    [addUser.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUSES.FULFILLED;
      const payloadCopy = { ...payload };
      payloadCopy.id = state.userData.length + 1;
      state.userData.push(payloadCopy);
      localStorage.setItem("users", JSON.stringify(state.userData));
    },
    [addUser.rejected](state) {
      state.loading = HTTP_STATUSES.REJECTED;
      state.erorMessage = 'error'
    },
    [deleteUser.pending](state) {
      state.loading = HTTP_STATUSES.PENDING;
    },
    [deleteUser.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUSES.FULFILLED;
      state.userData.forEach((user, i) => {
        if (user.id === payload.userId) {
          state.userData.splice(i, 1);
          state.userData.map((element, i) => {
            return (element.id = i + 1);
          });
          localStorage.setItem("users", JSON.stringify(state.userData));
        }
      });
      state.filteredUserData.forEach((user, i) => {
        if (user.id === payload.userId) {
          state.filteredUserData.splice(i, 1);
        }
      });
    },
    [deleteUser.rejected](state) {
      state.loading = HTTP_STATUSES.REJECTED;
      state.erorMessage = 'error'
    },
    [changeUserName.pending](state) {
      state.loading = HTTP_STATUSES.PENDING;
    },
    [changeUserName.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUSES.FULFILLED;
      state.userData.forEach((user, i) => {
        if (user.id === payload.userId) {
          state.userData[i].name = payload.value;
          localStorage.setItem("users", JSON.stringify(state.userData));
        }
      });
      state.filteredUserData.forEach((user, i) => {
        if (user.id === payload.userId) {
          state.filteredUserData[i].name = payload.value;
        }
      });
    },
    [changeUserName.rejected](state) {
      state.loading = HTTP_STATUSES.REJECTED;
      state.erorMessage = 'error'
    },
  },
});

export const { filterUser, sortUser } = UsersSlice.actions;
export default UsersSlice.reducer;
