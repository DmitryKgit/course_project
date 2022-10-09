import React from "react";
import PropTypes from "prop-types";

const SearchInput = ({ onChangeSearch }) => {
  return (
    <form>
      <fieldset>
        <div className="mb-3">
          <input
            type="text"
            id="disabledTextInput"
            className="form-control"
            placeholder="Search..."
            onChange={onChangeSearch}
          />
        </div>
      </fieldset>
    </form>
  );
};

SearchInput.propTypes = {
  onChangeSearch: PropTypes.func.isRequired
};

export default SearchInput;
