import './SalesTable.css';

function SalesTable({ data, loading }) {
  if (loading) {
    return (
      <div className="table-wrapper">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Customer ID</th>
              <th>Customer name</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Product Category</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, i) => (
              <tr key={i}>
                <td><div className="skeleton"></div></td>
                <td><div className="skeleton"></div></td>
                <td><div className="skeleton"></div></td>
                <td><div className="skeleton"></div></td>
                <td><div className="skeleton"></div></td>
                <td><div className="skeleton"></div></td>
                <td><div className="skeleton"></div></td>
                <td><div className="skeleton"></div></td>
                <td><div className="skeleton"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="sales-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Product Category</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sale, index) => (
            <tr key={sale.id || index}>
              <td><span className="transaction-id">{sale.transactionId}</span></td>
              <td><span className="date">{sale.date}</span></td>
              <td><span className="customer-id">{sale.customerId}</span></td>
              <td><span className="customer-name">{sale.customerName}</span></td>
              <td>
                <div className="phone-cell">
                  <span className="phone-number">{sale.phoneNumber}</span>
                  <button className="copy-btn" onClick={() => navigator.clipboard.writeText(sale.phoneNumber)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
              </td>
              <td><span className="gender">{sale.gender}</span></td>
              <td><span className="age">{sale.age}</span></td>
              <td><span className="category">{sale.productCategory}</span></td>
              <td><span className="quantity">{String(sale.quantity).padStart(2, '0')}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesTable;
