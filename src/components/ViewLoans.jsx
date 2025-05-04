import React, { useEffect, useState } from 'react';
import '../styles/ViewLoans.css';

const ViewLoans = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://khaata-backend-g0u9.onrender.com/api/loans', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch loans');
        }

        const data = await res.json();
        setLoans(data);
      } catch (err) {
        alert(err.message);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div className="loans-container">
      <h2>Loans List</h2>
      <div className="loans-list">
        {loans.length === 0 ? (
          <p>No loans found.</p>
        ) : (
          loans.map((loan) => (
            <div key={loan._id} className="loan-card">
              <p><strong>Item:</strong> {loan.item}</p>
              <p><strong>Amount:</strong> ₹{loan.amount}</p>
              <p><strong>Customer ID:</strong> {loan.customerId}</p>
              <p><strong>Issue Date:</strong> {new Date(loan.issueDate).toLocaleDateString()}</p>
              <p><strong>Due Date:</strong> {new Date(loan.dueDate).toLocaleDateString()}</p>
              <p><strong>Frequency:</strong> {loan.frequency}</p>
              <p><strong>Status:</strong> {loan.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewLoans;
