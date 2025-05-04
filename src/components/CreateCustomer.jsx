import React, { useState } from 'react';
import { createCustomer } from '../services/api';
import '../styles/CreateCustomer.css'; 

export default function CreateCustomer() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await createCustomer(form, token);
    const data = await res.json();
    if (res.ok) alert('Customer created');
    else alert(data.message || 'Error');
  };

  return (
    <div className="create-customer-container">
      <h2>Create Customer</h2>
      <form onSubmit={handleSubmit} className="create-customer-form">
        <input type="text" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="text" placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} required />
        <button type="submit">Create Customer</button>
      </form>
    </div>
  );
}
