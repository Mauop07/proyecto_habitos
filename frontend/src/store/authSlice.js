import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const loginUser = createAsyncThunk('auth/login', async (credenciales) => {
    const response = await axios.post(`${API_URL}/login`, credenciales);
    localStorage.setItem('usuarioId', response.data.usuarioId);
    return response.data.usuarioId;
});

export const registerUser = createAsyncThunk('auth/register', async (credenciales) => {
    await axios.post(`${API_URL}/register`, credenciales);
    // Auto-login después de registrarse
    const response = await axios.post(`${API_URL}/login`, credenciales);
    localStorage.setItem('usuarioId', response.data.usuarioId);
    return response.data.usuarioId;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        usuarioId: typeof window !== 'undefined' ? localStorage.getItem('usuarioId') : null,
        status: 'idle'
    },
    reducers: {
        logout: (state) => {
            state.usuarioId = null;
            localStorage.removeItem('usuarioId');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.usuarioId = action.payload;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.usuarioId = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;