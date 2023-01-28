import React from "react";
function Select({ name, label, error, value, values, onChange }) {
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
          className="form-select"
          name={name}
          aria-label="The Genres"
          value={value}
          onChange={onChange}
        >
          <option value={null}></option>
          {values.map((v) => (
            <option key={v._id} value={v._id}>
              {v.name}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </React.Fragment>
  );
}

export default Select;
