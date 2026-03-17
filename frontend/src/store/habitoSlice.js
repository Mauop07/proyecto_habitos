import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/habitos';

export const fetchHabitos = createAsyncThunk('habitos/fetchHabitos', async (usuarioId) => {
    const response = await axios.get(`${API_URL}?usuario=${usuarioId}`);
    return response.data;
});

export const agregarHabito = createAsyncThunk('habitos/agregar', async (nuevoHabito) => {
    const response = await axios.post(API_URL, nuevoHabito);
    return response.data;
});

export const marcarHabitoDone = createAsyncThunk('habitos/marcarDone', async (id) => {
    const response = await axios.put(`${API_URL}/${id}/done`);
    return response.data;
});

const habitoSlice = createSlice({
    name: 'habitos',
    initialState: { lista: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHabitos.fulfilled, (state, action) => {
                state.lista = action.payload;
                state.status = 'succeeded';
            })
            .addCase(agregarHabito.fulfilled, (state, action) => {
                state.lista.push(action.payload);
            })
            .addCase(marcarHabitoDone.fulfilled, (state, action) => {
                const index = state.lista.findIndex(h => h._id === action.payload._id);
                if (index !== -1) state.lista[index] = action.payload;
            });
    }
});

export default habitoSlice.reducer;