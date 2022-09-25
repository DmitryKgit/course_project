import React, { useState } from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const [currentSortedCol, setCurrentSortedCol] = useState({
    colName: "",
    colOrder: ""
  });

  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc" // меняем класс i
      });
      setCurrentSortedCol({
        ...currentSortedCol,
        colName: item,
        colOrder: (
          <i
            className={`bi bi-caret-${
              selectedSort.order === "asc" ? "up" : "down"
            }-fill`}
          ></i>
        )
      });
    } else {
      onSort({ path: item, order: "asc" }); // добавить активный класс i
      setCurrentSortedCol({
        ...currentSortedCol,
        colName: item,
        colOrder: <i className="bi bi-caret-down-fill"></i>
      });
    }
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            {...{ role: columns[column].path && "button" }}
            scope="col"
          >
            {columns[column].name}
            {columns[column].path === currentSortedCol.colName &&
              currentSortedCol.colOrder}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableHeader;
