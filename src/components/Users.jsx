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
    dispatch(deleteUser(parentElementId));
  };

  return (
    <div>
      {errorMessage}
      <div className="table-container">
        <div className="table">
          <div className="thead">
            <div className="tr">
              <div className="td">Name</div>
              <div className="td">Email</div>
              <div className="td">Phone</div>
              <div className="td">Options</div>
            </div>
          </div>
          <div className="tbody">
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
                    <Fragment>
                      <div key={id} id={id} className="tr">
                        {editMode === id ? (
                          <input
                            value={value}
                            autoFocus
                            onChange={(e) => setValue(e.target.value)}
                            onBlur={(e) => onChangeHandler(e)}
                          />
                        ) : (
                          <Fragment style={{ display: "flex" }}>
                            <div
                              className="block-card__name td pointer"
                              onClick={(e) => onClickHandler(e)}
                            >
                              {name}
                              <span>Name</span>
                            </div>
                          </Fragment>
                        )}
                        <div className="block-card__email td">
                          {email} <span>Email</span>
                        </div>
                        <div className="block-card__phone td">
                          {phone} <span>Phone</span>
                        </div>
                        <div onClick={onDeleteAction} className="td pointer">
                          Delete
                          <span>Options</span>
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
