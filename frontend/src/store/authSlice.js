import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://proyecto-habitos-kp8rgufgt-mauop07s-projects.vercel.app/api/auth';

export const loginUser = createAsyncThunk('auth/login', async (credenciales, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credenciales);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usuarioId', response.data.usuarioId);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.mensaje || 'Error al iniciar sesión');
    }
});

export const registerUser = createAsyncThunk('auth/register', async (datosUsuario, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/register`, datosUsuario);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.mensaje || 'Error al registrarse');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
        usuarioId: typeof window !== 'undefined' ? localStorage.getItem('usuarioId') : null,
        status: 'idle',
        error: null
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.usuarioId = null;
            localStorage.removeItem('token');
            localStorage.removeItem('usuarioId');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.usuarioId = action.payload.usuarioId;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;