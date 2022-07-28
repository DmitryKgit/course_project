import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  };

  const handleToggleBookMark = (id) => {
    setUsers((prevState) =>
      prevState.map((user) =>
        user._id !== id ? user : { ...user, bookmark: !user.bookmark }
      )
    );
  };

  return (
    <>
      <SearchStatus usersLen={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onToggle={handleToggleBookMark}
      />
    </>
  );
};

export default App;
