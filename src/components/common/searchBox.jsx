import React from "react";
function SearchBox({ value, onChange }) {
  return (
    <div>
      <input
        type="text"
        className="form-control mb-2"
        value={value}
        id="searchBar"
        placeholder="Search..."
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBox;
