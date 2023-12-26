const express = require('express');
const router = express();
const Usuarios = require('../models/Usuarios.js');
const Roles = require('../models/Roles.js');
const Lectivos = require('../models/Lectivos.js');
const Periodos = require('../models/Periodos.js');
const Etnias = require('../models/Etnias.js');
const Provincias = require('../models/Provincias.js');
const Cursos = require('../models/Cursos.js');
const Paralelos = require('../models/Paralelos.js');
const Docentes = require('../models/Docentes.js');
const Estudiantes = require('../models/Estudiantes.js');
const Alertas = require('../models/Alertas.js');
const Representantes = require("../models/Representantes.js");
const Observaciones = require("../models/Observaciones.js");


router.get('/usuarios', async (req, res)=>{
    try {
        const data = await Usuarios.findAll({
            include: [
                {
                  model: Roles,
                  attributes1: ['nom_rol'],
                },
              ],
        });
        res.status(200).json({ success: true, message: "Load successfull", data: data,});  
        }
        catch (error) {
            res.status(400).json({
                error: error.message,
        });
    }
});


router.get('/estudiantes', async (req, res)=>{
    try {
        const data = await Estudiantes.findAll({
            include: [
                {
                  model: Paralelos,
                  attributes1: ['nom_par'],
                  include: [
                    {
                      model: Cursos,
                      attributes1: ['nom_cur'],
                    },
                    {
                        model: Periodos,
                        attributes1: ['nom_per'],
                    }
                  ],
                },
                {
                    model: Provincias,
                    attributes1: ['nom_prov'],
                },
                {
                    model: Etnias,
                    attributes1:['nom_etn']
                }
              ], 
        });
        res.status(200).json({ success: true, message: "Load successfull", data: data,});  
        }
        catch (error) {
            res.status(400).json({
                error: error.message,
        });
    }
});


router.get('/roles', async (req, res) =>{
    try {
        const data = await Roles.findAll();
        res.status(200).json({ success: true, message: "Load successfull", data: data,});  
        }
        catch (error) {
            res.status(400).json({
                error: error.message,
        });
    }
});

router.get('/lectivos', async (req, res) =>{
    try {
        const data = await Lectivos.findAll();
        res.status(200).json({ success: true, message: "Load successfull", data: data,});  
        }
        catch (error) {
            res.status(400).json({
                error: error.message,
        });
    }
});

router.get('/lectivos/:id_ano', async (req, res)=>{
    try{
    const id_ano = req.params.id_ano;
    const response = await Lectivos.findOne({
        where: { id_ano: id_ano},
    });
    if (!response) {
        res.status(404).json({error:"El lectivo no existe"});
        return;
    }
    res.json({ success: true, message: "Load successfull", data: response});
    }catch(error){
        res.json({ success: false, error: error});
        console.log('ERROR: '+ error);
    }
});

router.get('/periodos', async (req,res)=>{
    try {
        const data = await Periodos.findAll();
        res.status(200).json({ success: true, message: "Load successfull", data: data,});  
        }
        catch (error) {
            res.status(400).json({
                error: error.message,
        });
    }
});

router.get('/etnias', async (req,res)=>{
    try {
        const data = await Etnias.findAll();
        res.status(200).json({ success: true, message: "Load successfull", data: data,});  
        }
        catch (error) {
            res.status(400).json({
                error: error.message,
        });
    }
});

router.get('/provincias', async (req,res)=>{
    try {
        const data = await Provincias.findAll();
        res.status(200).json({ success: true, message: "Load successfull", data: data,});  
    }
        catch (error) {
            res.status(400).json({
                error: error.message,
        });
    }
});

router.get('/cursos', async (req,res)=>{
    try {
        const data = await Cursos.findAll({
            include: [
                {
                  model: Lectivos,
                  attributes1: ['nom_año'],
                },
              ],
        });
        res.status(200).json({ success: true, message: "Load successfull", data: data,});  
        }
        catch (error) {
            res.status(400).json({
                error: error.message,
        });
    }
});

router.get('/docentes', async (req,res)=>{
    try {
        const data = await Docentes.findAll();
        res.status(200).json({ success: true, message: "Load successfull", data: data,});  
    }
    catch (error) {
            res.status(400).json({
                error: error.message,
        });
    }
});

router.get('/docentes/:id_doc', async (req, res)=>{
    try{
    const id_doc = req.params.id_doc;
    const response = await Docentes.findOne({
        where: { id_doc: id_doc},
    });
    if (!response) {
        res.status(404).json({error:"El docente no existe"});
        return;
    }
    res.json({ success: true, message: "Load successfull", data: response});
    }catch(error){
        res.json({ success: false, error: error});
        console.log('ERROR: '+ error);
    }
});

router.get('/paralelos', async (req,res)=>{
    try {
        const data = await Paralelos.findAll({
            include: [
                {
                    model: Cursos,
                  attributes1: ['nom_cur'],
                },
                {
                  model: Periodos,
                  attributes1: ['nom_per'],
                },
            ],
        });
        res.status(200).json({ success: true, message: "Load successfull", data: data,});  
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.get('/paralelos/:id_cur_per', async (req,res)=>{
    try {
        const id_cur_per = req.params.id_cur_per;
        const response = await Paralelos.findAll({
            where: { id_cur_per: id_cur_per},
        });
        if (!response) {
            res.status(404).json({error:"El paralelo no existe"});
            return;
        }
        res.status(200).json({ success: true, message: "Load successfull", data: response,});  
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});


router.get('/alertas', async (req, res)=>{
    try {
        const data = await Alertas.findAll({
            include: [
                {
                  model: Estudiantes,
                  attributes1: ['ced_est'],
                },
              ],
        });
        res.status(200).json({ success: true, message: "Load successfull", data: data,});  
        }
        catch (error) {
            res.status(400).json({
                error: error.message,
        });
    }
});

router.get('/alertas/:ced_est', async (req, res)=>{
    try {
        const ced_est = req.params.ced_est;
        const data = await Alertas.findOne({
            where: {ced_est: ced_est},
            include: [
                {
                  model: Estudiantes,
                  attributes1: ['ced_est'],
                },
              ],
        });
        if (!data) {
            res.status(404).json({error:"La alerta no existe"});
            return;
        }
        res.status(200).json({ success: true, message: "Load successfull", data: data,});  
        }
        catch (error) {
            res.status(400).json({
                error: error.message,
        });
    }
});

router.get('/usuarios/:id_usu', async (req, res)=>{
    try{
    const id_usu = req.params.id_usu;
    const response = await Usuarios.findOne({
        where: { id_usu: id_usu},
    });
    if (!response) {
        res.status(404).json({error:"El usuario no existe"});
        return;
    }
    res.json({ success: true, message: "Load successfull", data: response});
    }catch(error){
        res.json({ success: false, error: error});
        console.log('ERROR: '+ error);
    }
});


router.get('/estudiantes/:ced_est', async (req, res)=>{
    try{
    const ced_est = req.params.ced_est;
    const response = await Estudiantes.findOne({
        where: { ced_est: ced_est},
        include: [
            {
              model: Paralelos,
              attributes1: ['nom_par'],
              include: [
                {
                  model: Cursos,
                  attributes1: ['nom_cur'],
                },
                {
                    model: Periodos,
                    attributes1: ['nom_per'],
                }
              ],
            },
            {
                model: Provincias,
                attributes1: ['nom_prov'],
            },
            {
                model: Etnias,
                attributes1:['nom_etn']
            }
          ], 
    });
    if (!response) {
        res.status(404).json({error:"El usuario no existe"});
        return;
    }
    res.json({ success: true, message: "Load successfull", data: response});
    }catch(error){
        res.json({ success: false, error: error});
        console.log('ERROR: '+ error);
    }
});

router.get('/estudiante/:id_est', async (req, res)=>{
    try{
    const id_est = req.params.id_est;
    const data = await Estudiantes.findOne({
        where: { id_est: id_est},
        include: [
            {
              model: Paralelos,
              attributes: ['nom_par'],
            },
            {
                model: Provincias,
                attributes: ['nom_prov'],
            },
            {
                model: Etnias,
                attributes:['nom_etn']
            }
          ], 
    });
    if (!data) {
        res.status(404).json({error:"El estudiante no existe"});
        return;
    }
    res.json({ success: true, message: "Load successfull", data: data});
    }catch(error){
        res.json({ success: false, error: error});
        console.log('ERROR: '+ error);
    }
});

router.get('/representantes', async (req, res)=>{
    try {
        const data = await Representantes.findAll({
            include: [
                {
                    model: Estudiantes,
                    attributes1: ['ced_est'],
                },
              ], 
        });
        res.status(200).json({ success: true, message: "Load successfull", data: data,});  
        }
        catch (error) {
            res.status(400).json({
                error: error.message,
        });
    }
});

router.get('/observaciones', async (req, res)=>{
    try {
        const data = await Observaciones.findAll({
            include: [
                {
                  model: Alertas,
                  attributes1: ['id_ale'],
                  include: [
                    {
                      model: Estudiantes,
                      attributes1: ['id_est'],
                      include: [
                        {
                            model:Paralelos,
                            attributes1: ['id_par'],
                        }
                      ]
                    },
                  ], 
                },
                {
                    model: Usuarios,
                    attributes: ['usuario'],
                }
              ], 
        });
        res.status(200).json({ success: true, message: "Load successfull", data: data,});  
        }
        catch (error) {
            res.status(400).json({
                error: error.message,
        });
    }
});

router.get('/observacion/:id_ale_per', async (req, res)=>{
    try {
        const id_ale_per = req.params.id_ale_per;
        const data = await Observaciones.findAll({
        where: { id_ale_per: id_ale_per},
            include: [
                {
                  model: Alertas,
                  attributes1: ['id_ale'],
                  include: [
                    {
                      model: Estudiantes,
                      attributes1: ['id_est'],
                    },
                  ], 
                },
                {
                    model: Usuarios,
                    attributes: ['usuario'],
                }
              ], 
        });
        if (!data) {
            res.status(404).json({error:"La alerta no existe"});
            return;
        }
        res.status(200).json({ success: true, message: "Load successfull", data: data,});  
        }
        catch (error) {
            res.status(400).json({
                error: error.message,
        });
    }
});

router.get('/observaciones/:id_par', async (req, res)=>{
    try {
        const id_par = req.params.id_par;
        const data = await Observaciones.findAll({
        where: { '$alerta.estudiante.id_par_per$': id_par},
            include: [
                {
                  model: Alertas,
                  attributes1: ['id_ale'],
                  include: [
                    {
                      model: Estudiantes,
                      attributes1: ['id_est'],
                      include: [{
                          model: Paralelos,
                          attributes1: ['id_par'],
                      }
                      ]
                    },
                  ], 
                },
                {
                    model: Usuarios,
                    attributes: ['usuario'],
                }
              ], 
        });
        if (!data) {
            res.status(404).json({error:"La alerta no existe"});
            return;
        }
        res.status(200).json({ success: true, message: "Load successfull", data: data,});  
        }
        catch (error) {
            res.status(400).json({
                error: error.message,
        });
    }
});


module.exports = router;