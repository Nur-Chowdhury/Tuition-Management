import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    successMessage: null,
    loading: false,
    cnt: 5,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true; 
            state.error = null;
            state.successMessage = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
            state.successMessage = 'Signin successful!';
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signUpStart: (state) => {
            state.loading = true; 
            state.error = null;
            state.successMessage = null;
        },
        signUpSuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.successMessage = 'Signup successful!';
        },
        signUpFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signoutSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
            state.successMessage = 'Signout successful!';
        },
    },
}); 

export const {
    signInFailure,
    signInStart,
    signInSuccess,
    signUpFailure,
    signUpStart,
    signUpSuccess,
    signoutSuccess,
    updateStart,
    updateSuccess,
    updateFailure,
} = userSlice.actions;

export default userSlice.reducer;