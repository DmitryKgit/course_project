import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
  return (
    <span>
      <i className={`bi bi-emoji-smile${status ? "-fill" : ""}`}></i>
    </span>
  );
};

BookMark.propTypes = {
  status: PropTypes.bool
};

export default BookMark;
