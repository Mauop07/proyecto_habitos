const Habito = require('../models/Habito');

exports.crearHabito = async (req, res) => {
    try {
        const nuevoHabito = new Habito(req.body);
        await nuevoHabito.save();
        res.status(201).json(nuevoHabito);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el hábito', error });
    }
};

exports.obtenerHabitos = async (req, res) => {
    try {
        const habitos = await Habito.find();
        res.json(habitos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los hábitos' });
    }
};

// Para marcar como completado o cambiar datos
exports.actualizarHabito = async (req, res) => {
    try {
        const habitoActualizado = await Habito.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(habitoActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar' });
    }
};

// Para borrar un hábito
exports.eliminarHabito = async (req, res) => {
    try {
        await Habito.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Hábito eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al eliminar' });
    }
};