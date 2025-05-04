const API_URL = 'https://khaata-backend-g0u9.onrender.com/api';

export const register = (userData) => {
  return fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
};

export const login = async (userData) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    return await response.json(); 
  };

export const createCustomer = (data, token) => {
  return fetch(`${API_URL}/customers`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
};

export const createLoan = (data, token) => {
  return fetch(`${API_URL}/loans`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
};

export const addRepayment = (data, token) => {
  return fetch(`${API_URL}/repayments`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
};
