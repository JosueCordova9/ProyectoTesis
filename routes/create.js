const express = require('express');
const router = express.Router();
const Usuarios = require('../models/Usuarios.js');
const Periodos = require('../models/Periodos.js');
const Lectivos = require('../models/Lectivos.js');
const Roles = require('../models/Roles.js');
const Etnias  = require('../models/Etnias.js');
const Provincias = require('../models/Provincias.js');
const Cursos = require('../models/Cursos.js');
const Paralelos = require('../models/Paralelos.js');
const Docentes = require('../models/Docentes.js');
const Alertas = require('../models/Alertas.js');
const Estudiantes = require("../models/Estudiantes.js");
const Representantes = require("../models/Representantes.js");
const Observaciones = require("../models/Observaciones.js");


router.post('/usuarios', (req, res)=>{
    const input = req.body;
    const response = new Usuarios({
        usuario: input.usuario,
        nom_usu: input.nom_usu,
        ape_usu: input.ape_usu,
        con_usu: input.con_usu,
        id_rol_per: input.id_rol_per,
    });
    try {
        response.save();
        res.status(200).json({success: true, message:'Guardado exitoso'})

    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
    });

router.post('/periodos', (req, res)=>{
    const input = req.body;
    const response = new Periodos({
        nom_per: input.nom_per
    });
    try {
        response.save();
        res.status(200).json({success: true, message:'Guardado exitoso'})

    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.post('/lectivos', (req, res)=>{
    const input = req.body;
    const response = new Lectivos({
        nom_año: input.nom_año
    });
    try {
        response.save();
        res.status(200).json({success: true, message:'Guardado exitoso'})

    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.post('/roles', (req, res)=>{
    const input = req.body;
    const response = new Roles({
        
        nom_rol: input.nom_rol
    });
    try {
        response.save();
        res.status(200).json({success: true, message:'Guardado exitoso'})

    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.post('/etnias', (req, res)=>{
    const input = req.body;
    const response = new Etnias({
        nom_etn: input.nom_etn
    });
    try {
        response.save();
        res.status(200).json({success: true, message:'Guardado exitoso'})

    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.post('/provincias', (req, res)=>{
    const input = req.body;
    const response = new Provincias({
        nom_prov: input.nom_prov
    });
    try {
        response.save();
        res.status(200).json({success: true, message:'Guardado exitoso'})

    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.post('/cursos', (req, res)=>{
    const input = req.body;
    const response = new Cursos({
        nom_cur: input.nom_cur,
        id_año_per: input.id_año_per
    });
    try {
        response.save();
        res.status(200).json({success: true, message:'Guardado exitoso'})

    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.post('/docentes', (req, res)=>{
    const input = req.body;
    const response = new Docentes({
        ced_doc: input.ced_doc,
        nom_doc: input.nom_doc,
        ape_doc: input.ape_doc,
        tel_doc: input.tel_doc,
        dir_doc: input.dir_doc
    });
    try {
        response.save();
        res.status(200).json({success: true, message:'Guardado exitoso'})

    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.post('/paralelos', (req, res)=>{
    const input = req.body;
    const response = new Paralelos({
        nom_par: input.nom_par,
        id_cur_per: input.id_cur_per,
        id_per_per: input.id_per_per
    });
    try {
        response.save();
        res.status(200).json({success: true, message:'Guardado exitoso'})

    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.post('/alertas', (req, res)=>{
    const input = req.body;
    const response = new Alertas({
        id_est: input.id_est,
        ced_est: input.ced_est,
        des_ale: input.des_ale,
        nom_ale: input.nom_ale,
        ape_ale: input.ape_ale,
        car_ale: input.car_ale,
        con_ale: input.con_ale,
        fec_ale: input.fec_ale,
    });
    try {
        response.save();
        res.status(200).json({success: true, message:'Guardado exitoso'})

    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.post('/estudiantes', (req, res)=>{
    const input = req.body;
    const response = new Estudiantes({
        ced_est: input.ced_est,
        nom_est: input.nom_est,
        ape_est: input.ape_est,
        nac_est: input.nac_est,
        etn_est: input.etn_est,
        dom_est: input.dom_est,
        tel_est: input.tel_est,
        cor_est: input.cor_est,
        id_par_per: input.id_par_per,
    });
    try {
        response.save();
        res.status(200).json({success: true, message:'Guardado exitoso'})

    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
    });

    router.post('/representantes', (req, res)=>{
        const input = req.body;
        const response = new Representantes({
            id_est: input.id_est,
            ced_est_rep: input.ced_est_rep,
            //madre
            ced_mad: input.ced_mad,
            nom_mad: input.nom_mad,
            ape_mad: input.ape_mad,
            est_civ_mad: input.est_civ_mad,
            ins_mad: input.ins_mad,
            ocu_mad: input.ocu_mad,
            lug_tra_mad: input.lug_tra_mad,
            tel_mad: input.tel_mad,
            //padre
            ced_pad: input.ced_pad,
            nom_pad: input.nom_pad,
            ape_pad: input.ape_pad,
            est_civ_pad: input.est_civ_pad,
            ins_pad: input.ins_pad,
            ocu_pad: input.ocu_pad,
            lug_tra_pad: input.lug_tra_pad,
            tel_pad: input.tel_pad,
            //representante
            ced_rep: input.ced_rep,
            nom_rep: input.nom_rep,
            ape_rep: input.ape_rep,
            par_rep: input.par_rep,
            ocu_rep: input.ocu_rep,
            lug_tra_rep: input.lug_tra_rep,
            tel_rep: input.tel_rep,

        });
        try {
            response.save();
            res.status(200).json({success: true, message:'Guardado exitoso'})
    
        } catch (error) {
            res.status(400).json({
                error: error.message,
            });
        }
        });

        router.post('/observaciones', (req, res)=>{
            const input = req.body;
            const response = new Observaciones({
                id_ale_per: input.id_ale_per,
                observacion: input.observacion,
                fec_obs: input.fec_obs,
                id_usu: input.id_usu,
            });
            try {
                response.save();
                res.status(200).json({success: true, message:'Guardado exitoso'})
        
            } catch (error) {
                res.status(400).json({
                    error: error.message,
                });
            }
            });



module.exports = router;