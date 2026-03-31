const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/db'); 

const app = express();

connectDB();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://proyecto-habitos-front.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use(express.json());

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/habitos', require('./src/routes/habitoRoutes'));

app.get('/', (req, res) => {
    res.send('Servidor Vivo - Gestión de Hábitos y Seguridad');
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en local: http://localhost:${PORT}`);
    });
}

module.exports = app;
