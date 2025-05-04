import React, { useEffect, useState } from 'react';
import '../styles/ViewCustomers.css'; 

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://khaata-backend-g0u9.onrender.com/api/customers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch customers');
        }

        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        alert(err.message);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="customers-container">
      <h2>Customers List</h2>
      <div className="customers-list">
        {customers.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          customers.map((cust) => (
            <div key={cust._id} className="customer-card">
              <p><strong>Name:</strong> {cust.name}</p>
              <p><strong>Email:</strong> {cust.email}</p>
              <p><strong>Phone:</strong> {cust.phone}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewCustomers;
