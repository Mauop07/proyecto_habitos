const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

exports.registrar = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const nuevoUsuario = new Usuario({ email, password: hashedPassword });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: "Usuario creado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const esCorrecta = await bcrypt.compare(password, usuario.password);
    
    if (!esCorrecta) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.status(200).json({ mensaje: "Login exitoso", usuarioId: usuario._id });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor al iniciar sesión" });
  }
};