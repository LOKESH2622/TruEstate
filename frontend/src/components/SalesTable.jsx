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
              <td>{sale.transactionId}</td>
              <td>{sale.date}</td>
              <td className="customer-id">{sale.customerId}</td>
              <td>{sale.customerName}</td>
              <td>
                <div className="phone-cell">
                  {sale.phoneNumber}
                  <button className="copy-btn" onClick={() => navigator.clipboard.writeText(sale.phoneNumber)}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                  </button>
                </div>
              </td>
              <td>{sale.gender}</td>
              <td>{sale.age}</td>
              <td className="category">{sale.productCategory}</td>
              <td>{String(sale.quantity).padStart(2, '0')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesTable;
