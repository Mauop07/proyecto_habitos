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
    progreso: {
        type: Number,
        default: 0
    },
    ultimaFechaCompletado: {
        type: Date,
        default: null
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Habito', HabitoSchema);