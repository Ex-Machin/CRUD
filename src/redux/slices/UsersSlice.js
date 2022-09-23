import {
  createAsyncThunk,
  createSelector,
  createSlice
} from "@reduxjs/toolkit";
import usersAPI from "../../api/usersAPI";
import { HTTP_STATUSES } from "../htttpStatuses";

const namespace = "user";

export const fetchUsers = createAsyncThunk(`${namespace}/fetchUsers`, () =>
  usersAPI.fetchUsers()
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
    addUser(state, { payload }) {
      const payloadCopy = { ...payload };
      payloadCopy.id = state.userData[state.userData.length - 1].id + 1;
      state.userData.push(payloadCopy);
    },
    sortUser(state) {
      state.filteredUserData.length
        ? state.filteredUserData.reverse()
        : state.userData.reverse();
    },
    editUser(state, { payload }) {
      state.userData.forEach((user, i) => {
        if (user.id === payload.parentElementId) {
          state.userData[i].name = payload.value;
          localStorage.setItem("users", JSON.stringify(state.userData));
        }
      });
      state.filteredUserData.forEach((user, i) => {
        if (user.id === payload.parentElementId) {
          state.filteredUserData[i].name = payload.value;
        }
      });
    },
    deleteUser(state, { payload }) {
      state.userData.forEach((user, i) => {
        if (user.id === payload) {
          state.userData.splice(i, 1);
          localStorage.setItem("users", JSON.stringify(state.userData));
        }
      });
      state.filteredUserData.forEach((user, i) => {
        if (user.id === payload) {
          state.filteredUserData.splice(i, 1);
        }
      });
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
    },
  },
});

export const { addUser, filterUser, sortUser, editUser, deleteUser } =
  UsersSlice.actions;
export default UsersSlice.reducer;
