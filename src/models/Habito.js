const mongoose = require('mongoose');

const HabitoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del hábito es obligatorio'],
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    completado: {
        type: Boolean,
        default: false
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Habito', HabitoSchema);