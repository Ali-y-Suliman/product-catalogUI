import axios, { AxiosError } from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      const data = error.response.data as { Message: string, statusCode: number };
      return Promise.reject({
        message: data.Message || 'An unexpected error occurred',
        statusCode: data.statusCode || error.response.status
      });
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject({
        message: 'No response received from the server',
        statusCode: 500
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject({
        message: error.message || 'An error occurred while setting up the request',
        statusCode: 500
      });
    }
  }
);