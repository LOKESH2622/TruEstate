import './Pagination.css';

function Pagination({ pagination, onPageChange }) {
  const { currentPage, totalPages, totalItems, itemsPerPage, hasNextPage, hasPrevPage } = pagination;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="pagination">
      <div className="pagination-info">
        Showing <span className="highlight">{startItem}</span> to <span className="highlight">{endItem}</span> of <span className="highlight">{totalItems}</span> results
      </div>
      <div className="pagination-controls">
        <button className="page-btn nav-btn" onClick={() => onPageChange(currentPage - 1)} disabled={!hasPrevPage}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          <span className="btn-text">Previous</span>
        </button>
        <div className="page-numbers">
          {getPageNumbers().map((page, index) => (
            page === '...' ? <span key={`ellipsis-${index}`} className="page-ellipsis">...</span> :
            <button key={page} className={`page-btn number-btn ${currentPage === page ? 'active' : ''}`} onClick={() => onPageChange(page)}>{page}</button>
          ))}
        </div>
        <button className="page-btn nav-btn" onClick={() => onPageChange(currentPage + 1)} disabled={!hasNextPage}>
          <span className="btn-text">Next</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
