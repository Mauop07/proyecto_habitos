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
        const habitos = await Habito.find({ usuario: req.usuarioId });
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const habitosActualizados = await Promise.all(habitos.map(async (habito) => {
            if (habito.ultimaFechaCompletado) {
                const ultimaFecha = new Date(habito.ultimaFechaCompletado);
                ultimaFecha.setHours(0, 0, 0, 0);

                const diferenciaTiempo = hoy.getTime() - ultimaFecha.getTime();
                const diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);

                if (diferenciaDias > 1) {
                    habito.progreso = 0;
                    await habito.save();
                }
            }
            return habito;
        }));

        res.json(habitosActualizados);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener hábitos' });
    }
};

exports.marcarDone = async (req, res) => {
    try {
        const habito = await Habito.findById(req.params.id);
        if (!habito) return res.status(404).json({ mensaje: 'Hábito no encontrado' });

        const hoy = new Date();
        hoy.setUTCHours(0, 0, 0, 0); 

        let nuevoProgreso = habito.progreso || 0;

        if (habito.ultimaFechaCompletado) {
            const ultimaVez = new Date(habito.ultimaFechaCompletado);
            ultimaVez.setUTCHours(0, 0, 0, 0);

            const diferenciaTiempo = hoy - ultimaVez;
            const diferenciaDias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));

            if (diferenciaDias === 0) {
                return res.status(400).json({ mensaje: 'Ya completaste este hábito hoy' });
            } else if (diferenciaDias === 1) {
                nuevoProgreso += 1;
            } else {
                nuevoProgreso = 1; 
            }
        } else {
            nuevoProgreso = 1; 
        }

        
        habito.progreso = Math.min(nuevoProgreso, 66);
        habito.ultimaFechaCompletado = hoy;

        await habito.save();
        res.json(habito);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el hábito', error });
    }
};

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

exports.eliminarHabito = async (req, res) => {
    try {
        await Habito.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Hábito eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al eliminar' });
    }
};