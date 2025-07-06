import axios from 'axios';
import BASE_URL from '../config';

// Fetch all FAQs
export const getAllFAQ = async () => {
  try {
    const response = await axios.get(`${BASE_URL}api/FAQ/GetAll`);
    return response.data;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    throw error;
  }
};

// Post FAQ Data
export const createFAQ = async (data) => {
  const response = await axios.post(`${BASE_URL}api/FAQ/Create`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.data;
};

// Get a single FAQ by ID
export const getFAQById = async (id) => {
  const response = await axios.get(`${BASE_URL}api/FAQ/GetBy/${id}`);
  return response.data;
};

// Update a FAQ
export const updateCategory = async (id, data) => {
  const response = await axios.put(`${BASE_URL}api/FAQ/Edit/${id}`, data);
  return response.data;
};

// Delete a FAQ by ID
export const deleteFAQ = async (id) => {
  const response = await axios.delete(`${BASE_URL}api/FAQ/Delete/${id}`);
  return response.data;
};
