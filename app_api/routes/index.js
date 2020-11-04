const express = require('express');
const router = express.Router();
//requerir controladores
const ctrUsers = require('../controllers/users');

//Definir rutas para las acciones definidas para la colección users
router
    .route('/users')
    .post(ctrUsers.userCreate) // Crea un usuario
    .get(ctrUsers.userList); // Lee todos los usuarios

router
    .route('/users/:userid')
    .get(ctrUsers.userRead) // Lee un usuario específico
    .put(ctrUsers.userUpdate) // Actualiza un usuario
    .delete(ctrUsers.userDelete); // Borra un usuario

module.exports = router;