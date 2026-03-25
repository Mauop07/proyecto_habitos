import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/habitos';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const fetchHabitos = createAsyncThunk('habitos/fetchHabitos', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL, getAuthHeader());
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const agregarHabito = createAsyncThunk('habitos/agregar', async (nuevoHabito, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL, nuevoHabito, getAuthHeader());
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const marcarHabitoDone = createAsyncThunk('habitos/marcarDone', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/${id}/done`, {}, getAuthHeader());
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const habitoSlice = createSlice({
    name: 'habitos',
    initialState: {
        lista: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHabitos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHabitos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.lista = action.payload;
            })
            .addCase(fetchHabitos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(agregarHabito.fulfilled, (state, action) => {
                state.lista.push(action.payload);
            })
            .addCase(marcarHabitoDone.fulfilled, (state, action) => {
                const index = state.lista.findIndex(h => h._id === action.payload._id);
                if (index !== -1) {
                    state.lista[index] = action.payload; 
                }
            });
    }
});

export default habitoSlice.reducer;