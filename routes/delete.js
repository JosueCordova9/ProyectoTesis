const express = require("express");
const router = express.Router();
const Usuarios = require("../models/Usuarios.js");
const Docentes = require("../models/Docentes.js");
const Estudiantes = require("../models/Estudiantes.js");
const Lectivos = require("../models/Lectivos.js");
const Cursos = require("../models/Cursos.js");
const Paralelos = require("../models/Paralelos.js");
const Representantes = require("../models/Representantes.js");
const Alertas = require("../models/Alertas.js");
const Observaciones = require("../models/Observaciones.js");

router.delete("/usuarios/:id_usu", async (req, res) => {
  const id_usu = req.params.id_usu;
  const response = await Usuarios.findOne({
    where: { id_usu: id_usu },
  });
  if (!response) {
    res.status(404).json({error:"El usuario no existe"});
    return ;
  }
  
  try {
    await response.destroy();
    res.status(200).json({success: true, message: "Eliminado correctamente"});
  } catch (error) {
    res.status(400).
      json({
        error: error.message,
      });
  }
});

router.delete("/docentes/:id_doc", async (req, res) => {
  const id_doc = req.params.id_doc;

  const response = await Docentes.findOne({
    where: { id_doc: id_doc },
  });
  if (!response) {
    res.status(404).json({error:"El docente no existe"});
    return ;
  }
  
  try {
    await response.destroy();
    res.status(200).json({success: true, message: "Eliminado correctamente"});
  } catch (error) {
    res.status(400).
      json({
        error: error.message,
      });
  }
});

router.delete("/lectivos/:id_ano", async (req, res) => {
  const id_ano = req.params.id_doc;

  const response = await Lectivos.findOne({
    where: { id_ano: id_ano },
  });
  if (!response) {
    res.status(404).json({error:"El lectivo no existe"});
    return ;
  }
  
  try {
    await response.destroy();
    res.status(200).json({success: true, message: "Eliminado correctamente"});
  } catch (error) {
    res.status(400).
      json({
        error: error.message,
      });
  }
});

router.delete("/cursos/:id_cur", async (req, res) => {
  const id_cur = req.params.id_cur;

  const response = await Cursos.findOne({
    where: { id_cur: id_cur },
  });
  if (!response) {
    res.status(404).json({error:"El curso no existe"});
    return ;
  }
  
  try {
    await response.destroy();
    res.status(200).json({success: true, message: "Eliminado correctamente"});
  } catch (error) {
    res.status(400).
      json({
        error: error.message,
      });
  }
});

router.delete("/paralelos/:id_par", async (req, res) => {
  const id_par = req.params.id_par;

  const response = await Paralelos.findOne({
    where: { id_par: id_par },
  });
  if (!response) {
    res.status(404).json({error:"El paralelo no existe"});
    return ;
  }
  
  try {
    await response.destroy();
    res.status(200).json({success: true, message: "Eliminado correctamente"});
  } catch (error) {
    res.status(400).
      json({
        error: error.message,
      });
  }
});

router.delete("/estudiantes/:id_est", async (req, res) => {
  const id_est = req.params.id_est;

  const response = await Estudiantes.findOne({
    where: { id_est: id_est },
  });
  if (!response) {
    res.status(404).json({error:"El estudiante no existe"});
    return ;
  }
  
  try {
    await response.destroy();
    res.status(200).json({success: true, message: "Eliminado correctamente"});
  } catch (error) {
    res.status(400).
      json({
        error: error.message,
      });
  }
});

router.delete("/representantes/:id_rep", async (req, res) => {
  const id_rep = req.params.id_rep;

  const response = await Representantes.findOne({
    where: { id_rep: id_rep },
  });
  if (!response) {
    res.status(404).json({error:"El representante no existe"});
    return ;
  }
  
  try {
    await response.destroy();
    res.status(200).json({success: true, message: "Eliminado correctamente"});
  } catch (error) {
    res.status(400).
      json({
        error: error.message,
      });
  }
});

router.delete("/alertas/:id_ale", async (req, res) => {
  const id_ale = req.params.id_ale;

  const response = await Alertas.findOne({
    where: { id_ale: id_ale },
  });
  if (!response) {
    res.status(404).json({error:"La alerta no existe"});
    return ;
  }
  
  try {
    await response.destroy();
    res.status(200).json({success: true, message: "Eliminado correctamente"});
  } catch (error) {
    res.status(400).
      json({
        error: error.message,
      });
  }
});

router.delete("/observaciones/:id_obs", async (req, res) => {
  const id_obs = req.params.id_obs;

  const response = await Observaciones.findOne({
    where: { id_obs: id_obs },
  });
  if (!response) {
    res.status(404).json({error:"La observacion no existe"});
    return ;
  }
  
  try {
    await response.destroy();
    res.status(200).json({success: true, message: "Eliminado correctamente"});
  } catch (error) {
    res.status(400).
      json({
        error: error.message,
      });
  }
});

module.exports = router;
