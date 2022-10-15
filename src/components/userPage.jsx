import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  });

  const handleClick = () => {
    history.push("/users");
  };

  return (
    <>
      {user ? (
        <>
          <h1>{user.name}</h1>
          <h2>Профессия: {user.profession.name}</h2>
          {/* <h2>Профессия: {_.get(user, "profession.name")}</h2> */}
          <div>
            <QualitiesList qualities={user.qualities} />
          </div>
          <div>completedMeetings: {user.completedMeetings}</div>
          <h2>Rate: {user.rate}</h2>
          <button onClick={handleClick}>Все пользователи</button>
        </>
      ) : (
        "loading..."
      )}
    </>
  );
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
