import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
      </div>

      <div className="dashboard-section">
        <h3>Quick Links</h3>
        <ul className="dashboard-list">
          <li><Link to="/customers">Show Customers</Link></li>
          <li><Link to="/create-customer">Create Customer</Link></li>
          <li><Link to="/create-loan">Create Loan</Link></li>
          <li><Link to="/viewloans">View Loans</Link></li>
          <li><Link to="/add-repayment">Add Repayment</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
