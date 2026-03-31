const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/db'); 

const app = express();

connectDB();

app.use(cors({
    origin: 'https://proyecto-habitos-front.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api/auth', require('./src/routes/authRoutes'));

app.use('/api/habitos', require('./src/routes/habitoRoutes'));

app.get('/', (req, res) => {
    res.send('Servidor Vivo - Semana 4: Gestión de Hábitos y Seguridad');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo con éxito en el puerto ${PORT}`);
    console.log(`Checklist: AuthRoutes e HabitoRoutes cargados.`);
});

module.exports = app;