import axios from 'axios';
import { loginRoute, logoutRoute, registerRoute } from '../../utils/ApiRoutes';
import { 
    signInFailure, 
    signInStart, 
    signInSuccess, 
    signoutSuccess, 
    signUpFailure, 
    signUpStart, 
    signUpSuccess 
} from '../slices/userSlice';
import { toast } from 'react-toastify';


export const login = (email, password, navigate) => async (dispatch) => {
    dispatch(signInStart());
    try {
        const config = { 
            headers: { 'Content-Type': 'application/json', }, 
            withCredentials: true, // Include credentials in the request 
        };

        const res = await axios.post(loginRoute, { email, password }, config);
        const data = await res.data;
        dispatch(signInSuccess(data));
        toast.success('Login successful!');
        navigate('/'); 
    } catch (error) {
        const errorMessage = error.response && error.response.data
            ? error.response.data.message
            : error.message
            ? error.message
            : 'An unexpected error has occurred. Please try again later.';
        toast.error(errorMessage);
        dispatch(signInFailure(errorMessage));
    }
};

export const logout = (navigate) => async (dispatch) => {
    try {
        const res = await fetch(logoutRoute, {
            method: 'POST',
        })
        const data = await res.json();
        if(!res.ok){
            console.log(data.message);
        }else{
            dispatch(signoutSuccess());
            toast.success("Log Out Success!");
            navigate("/login");
        }
    } catch (error) {
        console.log(error.message);
    }
};

export const register = (userType, name, email, inst, department, password, navigate) => async (dispatch) => {
    dispatch(signUpStart());
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(registerRoute, { userType, name, email, inst, department, password }, config);
        dispatch(signUpSuccess(data));
        toast.success('Registration successful!');
        navigate('/login'); // Navigate to login page or another page after registration
    } catch (error) {
        const errorMessage = error.response && error.response.data
            ? error.response.data.message
            : error.message
            ? error.message
            : 'An unexpected error has occurred. Please try again later.';
        toast.error(errorMessage);
        dispatch(signUpFailure(errorMessage));
    }
};
