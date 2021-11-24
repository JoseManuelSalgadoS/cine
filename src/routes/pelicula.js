const express = require('express');
const router = express.Router();
const pool = require('../database.js');

router.get('/', async (req, res) => {
    let listPelicula = await pool.query('SELECT * FROM pelicula');
    res.json({
        status: 200,
        message: "Estas son todas la peliculas disponibles :D",
        listPelicula: listPelicula
    });
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let pelicula = await pool.query('SELECT * FROM pelicula WHERE id = ?',[id]);
    res.json({
        status: 200,
        message: "Este es la pelicula que elegiste :P",
        pelicula: pelicula
    })
});

router.post('/create', async (req, res) => {
    const {titulo, descripcion, sinopsis, rating, fechaRegistro, fechaActualizacion, idCategoria} = req.body;
    const pelicula = {
        titulo, descripcion, sinopsis, rating, fechaRegistro, fechaActualizacion, estado: 1, idCategoria
    };
    await pool.query('INSERT INTO pelicula set ?', [pelicula]);
    res.json({
        status: 200,
        message: "Pelicula registrada correctamente :D",
        pelicula: pelicula
    });
});

router.post('/update:id', async (req, res) => {
    const {id} = req.params;
    const {titulo, descripcion, sinopsis, rating, fechaRegistro, fechaActualizacion, idCategoria} = req.body;

    const pelicula = {titulo, descripcion, sinopsis, rating, fechaRegistro, fechaActualizacion, idCategoria};

    await pool.query('UPDATE pelicula SET ? WHERE id = ?', [pelicula, id]);
    res.json({
        status: 200,
        message: "La pelicula ha sido actualizado :D",
        pelicula: pelicula
    });
});

router.post('/delete:id', async (req, res) => {
    const {id} = req.params;

    await pool.query('UPDATE pelicula SET estado = 0 WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Pelicula eliminado :O"
    });
});



module.exports = router;