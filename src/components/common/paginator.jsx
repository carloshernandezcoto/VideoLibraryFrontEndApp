import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Paginator = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChanged } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "active page-item" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChanged(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Paginator.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired,
};

export default Paginator;
