import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HTTP_STATUSES } from "../redux/htttpStatuses";
import {
  changeUserName,
  deleteUser,
  fetchUsers,
  getErrorMessage,
  getFilteredUserData,
  getFilterQueries,
  getLoadingStatus,
  getUsers,
} from "../redux/slices/UsersSlice";
import "../styles/users.css";

const Users = () => {
  const users = useSelector(getUsers);
  const dispatch = useDispatch();
  const filteredUserData = useSelector(getFilteredUserData);
  const errorMessage = useSelector(getErrorMessage);
  const filterQueries = useSelector(getFilterQueries);
  const loading = useSelector(getLoadingStatus);
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState("");

  const data = filterQueries ? filteredUserData : users;

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch]);

  const getParentElement = (event) => {
    return +event.target.parentElement.id;
  };

  const onClickHandler = (e) => {
    const parentElementId = getParentElement(e);
    setEditMode(parentElementId);
  };
  const onChangeHandler = (e) => {
    const userId = getParentElement(e);
    value && dispatch(changeUserName({ userId, value }));
    setEditMode(false);
  };
  const onDeleteAction = (e) => {
    const parentElementId = getParentElement(e);
    console.log("e :>> ", e);
    console.log("parentElementId", parentElementId);
    dispatch(deleteUser(parentElementId));
  };

  return (
    <div>
      {errorMessage}
      <div className="table">
        <table cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Phone</td>
              <td>Options</td>
            </tr>
          </thead>
          <tbody>
            {loading === HTTP_STATUSES.PENDING ? (
              <img
                className="loader"
                src="https://media.giphy.com/media/J6ZIb7i8xsJeuvBy7y/giphy.gif"
                alt="loader"
              />
            ) : (
              <Fragment>
                {data.map(({ id, name, email, phone }) => {
                  return (
                    <tr key={id} id={id}>
                      {editMode === id ? (
                        <input
                          value={value}
                          autoFocus
                          onChange={(e) => setValue(e.target.value)}
                          onBlur={(e) => onChangeHandler(e)}
                        />
                      ) : (
                        <td
                          className="block-card__name"
                          onClick={(e) => onClickHandler(e)}
                        >
                          {name}
                        </td>
                      )}
                      <td className="block-card__email">{email}</td>
                      <td className="block-card__phone">{phone}</td>
                      <td onClick={onDeleteAction}>Delete</td>
                    </tr>
                  );
                })}
              </Fragment>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
