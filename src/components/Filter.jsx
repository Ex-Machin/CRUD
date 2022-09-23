import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterUser, getFilterQueries, sortUser } from "../redux/slices/UsersSlice";

const Filter = () => {
  const filterQueries = useSelector(getFilterQueries);
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    dispatch(filterUser(e.target.value));
  };

  const onClickHandler = () => {
    dispatch(sortUser());
  };

  return (
    <Fragment>
      <input
        value={filterQueries}
        placeholder="Найти"
        onChange={(e) => onChangeHandler(e)}
      />
      <button onClick={onClickHandler}>Сортировать по дате добавления</button>
    </Fragment>
  );
};

export default Filter;
