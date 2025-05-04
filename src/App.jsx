// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateCustomer from './components/CreateCustomer';
import CreateLoan from './components/CreateLoan';
import AddRepayment from './components/AddRepayment';
import ViewCustomers from './components/ViewCustomers';
import ViewLoans from './components/ViewLoans';
import "./App.css"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<ViewCustomers />} />
        <Route path="/create-customer" element={<CreateCustomer />} />
        <Route path="/create-loan" element={<CreateLoan />} />
        <Route path="/add-repayment" element={<AddRepayment />} />
        <Route path="/viewloans" element={<ViewLoans />} />

      </Routes>
    </Router>
  );
}

export default App;
