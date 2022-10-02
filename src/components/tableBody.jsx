import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import _ from "lodash";

const TableBody = ({ data, columns, onUserChange }) => {
  const renderContent = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    return _.get(item, columns[column].path);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column) => {
            const tdContent =
              columns[column].path === "name" ? (
                <Link
                  onClick={() => onUserChange(item._id)}
                  to={`users/${item._id}`}
                >
                  {renderContent(item, column)}
                </Link>
              ) : (
                renderContent(item, column)
              );
            return <td key={column}>{tdContent}</td>;
          })}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
  onUserChange: PropTypes.func.isRequired
};

export default TableBody;
