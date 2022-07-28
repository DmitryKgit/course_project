import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  bookmark,
  onDelete,
  onToggle
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map(({ _id, name, color }) => (
          <Quality key={_id} name={name} color={color} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <Bookmark status={bookmark} id={_id} onToggle={onToggle} />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(_id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.array.isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default User;
