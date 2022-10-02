import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const User = ({ user }) => {
  const history = useHistory();

  const handleReturn = () => {
    history.push("/users");
  };

  return (
    <>
      {user ? (
        <>
          <h1>{user.name}</h1>
          <h2>Профессия: {_.get(user, "profession.name")}</h2>
          <div>
            <QualitiesList qualities={user.qualities} />
          </div>
          <div>completedMeetings: {user.completedMeetings}</div>
          <h2>Rate: {user.rate}</h2>
          <button onClick={handleReturn}>Все пользователи</button>
        </>
      ) : (
        "Загрузка..."
      )}
    </>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired
  // id: PropTypes.string.isRequired
  // onUser: PropTypes.func.isRequired
};

export default User;
