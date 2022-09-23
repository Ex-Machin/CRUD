import React from "react";
import "./App.css";
import Filter from "./components/Filter";
import UserForm from "./components/UserForm";
import Users from "./components/Users";

const App = () => {
  return (
    <div className="container">
      <Filter />
      <Users />
      <UserForm />
    </div>
  );
};

export default App;
