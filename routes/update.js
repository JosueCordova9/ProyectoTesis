const express = require("express");
const router = express.Router();
const Usuarios = require("../models/Usuarios.js");
const Cursos = require("../models/Cursos.js");
const Docentes = require("../models/Docentes.js");
const Estudiantes = require("../models/Estudiantes.js");
const Lectivos = require("../models/Lectivos.js");
const Paralelos = require("../models/Paralelos.js");
const Alertas = require("../models/Alertas.js");
const Representantes = require("../models/Representantes.js");
const Observaciones = require("../models/Observaciones.js");


router.patch("/usuarios/:id_usu", async (req, res) => {
  const id_usu = req.params.id_usu;
  const input = req.body;
  const response = await Usuarios.findOne({
    where: { id_usu: id_usu },
  });
  if (!response) {
    res.status(404).json({ error: "El usuario no existe" });
    return;
  }
  response.usuario = input.usuario;
  response.nom_usu = input.nom_usu;
  response.ape_usu = input.ape_usu;
  response.con_usu = input.con_usu;
  response.id_rol_per = input.id_rol_per;

  try {
    response.save();
    res.status(200).json({ success: true, message: "Actualización exitosa" });
  } catch (error) {
    res.status(400).
      json({
        error: error.message,
      });
  }
});

router.patch("/docentes/:id_doc", async (req, res) => {
  const id_doc = req.params.id_doc;
  const input = req.body;
  const response = await Docentes.findOne({
    where: { id_doc: id_doc },
  });
  if (!response) {
    res.status(404).json({ error: "El docente no existe" });
    return;
  }
  response.ced_doc = input.ced_doc;
  response.nom_doc = input.nom_doc;
  response.ape_doc = input.ape_doc;
  response.tel_doc = input.tel_doc;
  response.dir_doc = input.dir_doc;

  try {
    response.save();
    res.status(200).json({ success: true, message: "Actualización exitosa" });
  } catch (error) {
    res.status(400).
      json({
        error: error.message,
      });
  }
});

router.patch("/estudiantes/:id_est", async (req, res) => {
  const id_est = req.params.id_est;
  const input = req.body;
  const response = await Estudiantes.findOne({
    where: { id_est: id_est },
  });
  if (!response) {
    res.status(404).json({ error: "El estudiante no existe" });
    return;
  }
  response.ced_est = input.ced_est;
  response.nom_est = input.nom_est;
  response.ape_est = input.ape_est;
  response.nac_est = input.nac_est;
  response.fec_est = input.fec_est;
  response.etn_est = input.etn_est;
  response.dom_est = input.dom_est;
  response.tel_est = input.tel_est;
  response.cor_est = input.cor_est;
  response.id_par_per = input.id_par_per;


  try {
    response.save();
    res.status(200).json({ success: true, message: "Actualización exitosa" });
  } catch (error) {
    res.status(400).
      json({
        error: error.message,
      });
  }
});

router.patch("/lectivos/:id_ano", async (req, res) => {
  const id_ano = req.params.id_ano;
  const input = req.body;
  const response = await Lectivos.findOne({
    where: { id_ano: id_ano },
  });
  if (!response) {
    res.status(404).json({ error: "El lectivo no existe" });
    return;
  }
  response.nom_año = input.nom_año;

  try {
    response.save();
    res.status(200).json({ success: true, message: "Actualización exitosa" });
  } catch (error) {
    res.status(400).
      json({
        error: error.message,
      });
  }
});

router.patch("/cursos/:id_cur", async (req, res) => {
  const id_cur = req.params.id_cur;
  const input = req.body;
  const response = await Cursos.findOne({
    where: { id_cur: id_cur },
  });
  if (!response) {
    res.status(404).json({ error: "El curso no existe" });
    return;
  }
  response.nom_cur = input.nom_cur;
  response.id_año_per = input.id_año_per;

  try {
    response.save();
    res.status(200).json({ success: true, message: "Actualización exitosa" });
  } catch (error) {
    res.status(400).
      json({
        error: error.message,
      });
  }
});

router.patch("/paralelos/:id_par", async (req, res) => {
  const id_par = req.params.id_par;
  const input = req.body;
  const response = await Paralelos.findOne({
    where: { id_par: id_par },
  });
  if (!response) {
    res.status(404).json({ error: "El paralelo no existe" });
    return;
  }
  response.nom_par = input.nom_par;
  response.id_cur_per = input.id_cur_per;
  response.id_per_per = input.id_per_per;

  try {
    response.save();
    res.status(200).json({ success: true, message: "Actualización exitosa" });
  } catch (error) {
    res.status(400).
      json({
        error: error.message,
      });
  }
});

router.patch("/alertas/:id_ale", async (req, res) => {
  const id_ale = req.params.id_ale;
  const input = req.body;
  const response = await Alertas.findOne({
    where: { id_ale: id_ale },
  });
  if (!response) {
    res.status(404).json({ error: "La alerta no existe" });
    return;
  }
  response.ced_est = input.ced_est;
  response.des_ale = input.des_ale;
  response.nom_ale = input.nom_ale;
  response.ape_ale = input.ape_ale;
  response.car_ale = input.car_ale;
  response.con_ale = input.con_ale;
  response.fec_ale = input.fec_ale;

  try {
    response.save();
    res.status(200).json({ success: true, message: "Actualización exitosa" });
  } catch (error) {
    res.status(400).
      json({
        error: error.message,
      });
  }
});

router.patch("/representantes/:id_rep", async (req, res) => {
  const id_rep = req.params.id_rep;
  const input = req.body;
  const response = await Representantes.findOne({
    where: { id_rep: id_rep },
  });
  if (!response) {
    res.status(404).json({ error: "El representante no existe" });
    return;
  }
  response.ced_est_rep= input.ced_est_rep;
  //madre
  response.ced_mad= input.ced_mad;
  response.nom_mad= input.nom_mad;
  response.ape_mad= input.ape_mad;
  response.est_civ_mad= input.est_civ_mad;
  response.ins_mad= input.ins_mad;
  response.ocu_mad= input.ocu_mad;
  response.lug_tra_mad= input.lug_tra_mad;
  response.tel_mad= input.tel_mad;
  //padre
  response.ced_pad= input.ced_pad;
  response.nom_pad= input.nom_pad;
  response.ape_pad= input.ape_pad;
  response.est_civ_pad= input.est_civ_pad;
  response.ins_pad= input.ins_pad;
  response.ocu_pad= input.ocu_pad;
  response.lug_tra_pad= input.lug_tra_pad;
  response.tel_pad= input.tel_pad;
  //representante
  response.ced_rep= input.ced_rep;
  response.nom_rep= input.nom_rep;
  response.ape_rep= input.ape_rep;
  response.par_rep= input.par_rep;
  response.ocu_rep= input.ocu_rep;
  response.lug_tra_rep= input.lug_tra_rep;
  response.tel_rep= input.tel_rep;
  try {
    response.save();
    res.status(200).json({ success: true, message: "Actualización exitosa" });
  } catch (error) {
    res.status(400).
      json({
        error: error.message,
      });
  }
});

router.patch("/observaciones/:id_obs", async (req, res) => {
  const id_obs = req.params.id_obs;
  const input = req.body;
  const response = await Observaciones.findOne({
    where: { id_obs: id_obs },
  });
  if (!response) {
    res.status(404).json({ error: "La observacion no existe" });
    return;
  }
  response.id_ale_per = input.id_ale_per;
  response.observacion = input.observacion;
  response.fec_obs = input.fec_obs;
  response.id_usu = input.id_usu;

  try {
    response.save();
    res.status(200).json({ success: true, message: "Actualización exitosa" });
  } catch (error) {
    res.status(400).
      json({
        error: error.message,
      });
  }
});

module.exports = router;
