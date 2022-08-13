import React, { useEffect, useState } from "react";
import Users from "./components/users";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

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
      {users && (
        <Users
          users={users}
          onDelete={handleDelete}
          onToggle={handleToggleBookMark}
        />
      )}
    </>
  );
};

export default App;
