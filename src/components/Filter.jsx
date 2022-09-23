import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterUser,
  getFilterQueries,
  sortUser,
} from "../redux/slices/UsersSlice";
import "../styles/filter.css";

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
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="What are you looking for?"
            value={filterQueries}
            onChange={(e) => onChangeHandler(e)}
          />
          <button onClick={onClickHandler} className="searchButton">
            Sort by date
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Filter;
