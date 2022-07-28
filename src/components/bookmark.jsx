import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, id, onToggle }) => {
  return (
    <span>
      <i
        className={`bi bi-emoji-smile${status ? "-fill" : ""}`}
        onClick={() => onToggle(id)}
      ></i>
    </span>
  );
};

Bookmark.propTypes = {
  status: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default Bookmark;
