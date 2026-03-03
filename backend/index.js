const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/db'); 

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/habitos', require('./src/routes/habitoRoutes'));

app.get('/', (req, res) => {
    res.send('Servidor vivo y listo para la tarea');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});