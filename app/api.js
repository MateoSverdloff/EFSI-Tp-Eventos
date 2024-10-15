"use client"

import axios from 'axios';
import { useRouter } from 'next/router';

const API_URL_EVENT = 'http://localhost:3000/api/event'
const API_URL_USER = 'http://localhost:3000/api/user/';

export const login = async ({ username, password }) => {
  try {
    const response = await axios.post(`${API_URL_USER}login`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};



export const register = async (data) => {

  try {
    const response = await axios.post(`${API_URL_USER}`, data);
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};


export const getEvents = async () => {
  try {
    const response = await axios.get(`${API_URL_EVENT}`, {});
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};