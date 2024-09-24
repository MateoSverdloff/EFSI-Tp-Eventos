"use client"

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/user/';

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}login`, data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error); 
    throw error;
  }
};

export const register = async (data) => {
  { console.log('<<<<<<<<<<<<<<<<',data) }
  try {
    const response = await axios.post(`${API_URL}`, data);
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};