"use client"

import axios from 'axios';
import { useRouter } from 'next/router';

const API_URL_EVENT = 'http://localhost:3000/api/event'
const API_URL_USER = 'http://localhost:3000/api/user/';
const API_URL_ENROLLMENTS = 'http://localhost:3000/api/event/enrollment'

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

export const enrollInEvent = async (eventId, token) => {
  try {
    if (!token) throw new Error('Token no disponible');
    const response = await axios.post(`${API_URL_EVENT}/${eventId}/enrollment`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Enrollment error:', error);
    throw error;
  }
};

export const unsubscribeFromEvent = async (eventId, token) => {
  try {
    if (!token) throw new Error('Token no disponible');
    const response = await axios.delete(`${API_URL_EVENT}/${eventId}/enrollment`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al desinscribirse del evento:', error);
    throw error;
  }
};