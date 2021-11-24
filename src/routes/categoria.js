const express = require('express');
const router = express.Router();
const pool = require('../database.js');

router.get('/', async (req, res) => {
    let listCategoria = await pool.query('SELECT * FROM categoria');
    res.json({
        status: 200,
        message: "Estas son todas las categorias disponibles :D",
        listCategoria: listCategoria
    });
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let categoria = await pool.query('SELECT * FROM categoria WHERE id = ?',[id]);
    res.json({
        status: 200,
        message: "Este es la categoria que elegiste :P",
        categoria: categoria
    })
});

router.post('/create', async (req, res) => {
    const {nombre} = req.body;
    const categoria = {
        nombre
    };
    await pool.query('INSERT INTO categoria set ?', [categoria]);
    res.json({
        status: 200,
        message: "Categoria registrada correctamente :D",
        categoria: categoria
    });
});

router.post('/update:id', async (req, res) => {
    const {id} = req.params;
    const {nombre} = req.body;

    const categoria = {nombre};

    await pool.query('UPDATE categoria SET ? WHERE id = ?', [categoria, id]);
    res.json({
        status: 200,
        message: "La categoria ha sido actualizada :D",
        categoria: categoria
    });
});

router.post('/delete:id', async (req, res) => {
    const {id} = req.params;

    await pool.query('DELETE FROM categoria WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Categoria eliminado :O"
    });
});



module.exports = router;