import './Pagination.css';

function Pagination({ pagination, onPageChange }) {
  const { currentPage, totalPages, totalItems, itemsPerPage, hasNextPage, hasPrevPage } = pagination;
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination">
      <span className="pagination-info">Showing {start} to {end} of {totalItems}</span>
      <div className="pagination-btns">
        <button disabled={!hasPrevPage} onClick={() => onPageChange(currentPage - 1)}>Previous</button>
        <span className="page-num">{currentPage} / {totalPages}</span>
        <button disabled={!hasNextPage} onClick={() => onPageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
}

export default Pagination;
