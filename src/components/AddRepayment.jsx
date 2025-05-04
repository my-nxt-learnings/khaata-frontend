import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddRepayment.css'; 

const AddRepayment = () => {
  const [formData, setFormData] = useState({
    loanId: '',
    amount: '',
    date: ''
  });

  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await fetch('https://khaata-backend-g0u9.onrender.com/api/loans', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        setLoans(data);
      } catch (err) {
        console.error('Failed to fetch loans:', err);
      }
    };

    fetchLoans();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/repayments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('Repayment failed');
      }

      const data = await res.json();
      alert(data.message || 'Repayment recorded successfully');
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="repayment-container">
      <h2>Add Repayment</h2>
      <form onSubmit={handleSubmit} className="repayment-form">
        <label>Loan:</label>
        <select name="loanId" value={formData.loanId} onChange={handleChange} required>
          <option value="">Select Loan</option>
          {loans.map((loan) => (
            <option key={loan._id} value={loan._id}>
              {loan.item} (₹{loan.amount}) - {loan.status}
            </option>
          ))}
        </select>

        <input name="amount" type="number" placeholder="Repayment Amount" value={formData.amount} onChange={handleChange} required />
        <input name="date" type="date" value={formData.date} onChange={handleChange} required />
        
        <button type="submit">Add Repayment</button>
      </form>
    </div>
  );
};

export default AddRepayment;
