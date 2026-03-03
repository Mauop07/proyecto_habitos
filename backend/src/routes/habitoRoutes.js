const express = require('express');
const router = express.Router();
const habitoController = require('../controllers/habitoController');

router.post('/', habitoController.crearHabito); 
router.get('/', habitoController.obtenerHabitos); 

router.put('/:id', habitoController.actualizarHabito); // Actualizar
router.delete('/:id', habitoController.eliminarHabito); // Eliminar

module.exports = router;