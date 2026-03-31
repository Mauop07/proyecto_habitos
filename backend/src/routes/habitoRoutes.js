const express = require('express');
const router = express.Router();
const habitoController = require('../controllers/habitoController');

router.post('/', habitoController.crearHabito); 
router.get('/', habitoController.obtenerHabitos); 
router.put('/:id/done', habitoController.marcarDone); 
router.put('/:id', habitoController.actualizarHabito); 
router.delete('/:id', habitoController.eliminarHabito); 

module.exports = router;