import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateLoan.css'; 

const CreateLoan = () => {
  const [formData, setFormData] = useState({
    customerId: '',
    item: '',
    amount: '',
    issueDate: '',
    dueDate: '',
    frequency: 'monthly'
  });

  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('https://khaata-backend-g0u9.onrender.com/api/customers', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        console.error('Failed to fetch customers:', err);
      }
    };

    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('Loan creation failed');
      }

      const data = await res.json();
      alert(data.message || 'Loan created successfully');
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="create-loan-container">
      <h2>Create Loan</h2>
      <form onSubmit={handleSubmit} className="create-loan-form">
        <label>Customer:</label>
        <select name="customerId" value={formData.customerId} onChange={handleChange} required>
          <option value="">Select Customer</option>
          {customers.map((cust) => (
            <option key={cust._id} value={cust._id}>
              {cust.name}
            </option>
          ))}
        </select>

        <input name="item" placeholder="Item Description" value={formData.item} onChange={handleChange} required />
        <input name="amount" type="number" placeholder="Loan Amount" value={formData.amount} onChange={handleChange} required />

        <label>Issue Date</label>
        <input name="issueDate" type="date" value={formData.issueDate} onChange={handleChange} required />

        <label>Due Date</label>
        <input name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} required />

        <label>Frequency</label>
        <select name="frequency" value={formData.frequency} onChange={handleChange} required>
          <option value="monthly">Monthly</option>
          <option value="bi-weekly">Bi-Weekly</option>
        </select>

        <button type="submit">Create Loan</button>
      </form>
    </div>
  );
};

export default CreateLoan;
