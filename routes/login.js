const express = require('express');
const router = express.Router();
const Usuarios = require('../models/Usuarios.js');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) =>{
    const usuario = req.body.usuario;
    const con_usu = req.body.con_usu;

    try {
        const response = await Usuarios.findOne({
            where: {
              usuario: usuario,
            },
          });
        if (!response) {
            return res.status(401).json({mensaje:"El usuario no existe",});
        }
        if (response.con_usu !== con_usu) {
            return res.status(401).json({mensaje: 'La contraseña no es correcta',});
          }
        const token = jwt.sign({ usuario: usuario, rol: response.id_rol_per, id: response.id_usu }, "Stack", 
            { expiresIn: "30m" 
        });
        res.status(200).json({ token });
        } catch(error) {
            res.status(400).json({
            error: error.message,
            });
        }
    });

module.exports = router;