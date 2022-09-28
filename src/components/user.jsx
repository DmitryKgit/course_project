import React from "react";
import PropTypes from "prop-types";

const User = ({ users, id }) => {
  console.log(users, id);

  return <h1>User</h1>;
};

User.propTypes = {
  users: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired
};

export default User;
