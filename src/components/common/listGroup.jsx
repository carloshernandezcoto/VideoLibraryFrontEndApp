import React from "react";

function ListGroup(props) {
  const { items, selectedItem, textProperty, valueProperty, onItemSelect } =
    props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          // style={{ cursor: "pointer" }}
          className={
            item._id === selectedItem._id
              ? "list-group-item clickable active"
              : "list-group-item clickable"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
