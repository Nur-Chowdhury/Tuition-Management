// src/axiosConfig.js
import axios from 'axios';
import { toast } from 'react-toastify';
import {store} from '../redux/store'; // Adjust the path according to your store location
import { logout } from '../redux/actions/authActions';

axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized
      toast.error('Session expired. Please log in again.');
      localStorage.removeItem('userID'); // Remove user ID from local storage
      // Dispatch logout action
      store.dispatch(logout());
      // Redirect to login page
      window.location.href = '/'; 
    }
    return Promise.reject(error);
  }
);

export default axios;
