import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HTTP_STATUSES } from "../redux/htttpStatuses";
import {
  editUser,
  fetchUsers,
  deleteUser,
  getFilteredUserData,
  getFilterQueries,
  getLoadingStatus,
  getUsers,
} from "../redux/slices/UsersSlice";

const Users = () => {
  const users = useSelector(getUsers);
  const dispatch = useDispatch();
  const filteredUserData = useSelector(getFilteredUserData);
  const filterQueries = useSelector(getFilterQueries);
  const loading = useSelector(getLoadingStatus);
  const [editMode, setEditMode] = useState(0);
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
    const parentElementId = getParentElement(e)
    setEditMode(parentElementId);
  };
  const onBlurHandler = (e) => {
    const parentElementId = getParentElement(e)
    value && dispatch(editUser({ value, parentElementId }));
    setEditMode(false);
  };
  const onDeleteAction = (e) => {
    const parentElementId = getParentElement(e)
    dispatch(deleteUser(parentElementId));
  };

  return (
    <div className="cards__container">
      {loading === HTTP_STATUSES.PENDING ? (
        "Loading..."
      ) : (
        <div className="cards__block block-card">
          {data.map(({ id, name, email, phone }) => {
            return (
              <div key={id} id={id}>
                {editMode === id ? (
                  <input
                    value={value}
                    autoFocus
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={(e) => onBlurHandler(e)}
                  />
                ) : (
                  <div
                    className="block-card__name"
                    onClick={(e) => onClickHandler(e)}
                  >
                    {name}
                  </div>
                )}
                <div className="block-card__email">{email}</div>
                <div className="block-card__phone">{phone}</div>
                <button onClick={onDeleteAction}> Detele</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Users;
