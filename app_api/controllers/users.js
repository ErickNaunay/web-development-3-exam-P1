//Usar mongoose y el modelo compilado para acceder a la DB
const mongoose = require('mongoose');
const users = mongoose.model('user');

// Controladores
// Crear un nuevo documento
const userCreate = (req, res) => {
    users.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        edad: req.body.edad,
        telefono: req.body.telefono,
        materias: {
            tipo: req.body.tipo,
            nombres: [req.body.nombres]
        }
    }, (err, objetoUsuario) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(objetoUsuario);
        }
    });
};
// Leer todos los docuemntos
const userList = (req, res) => {
    users
        .find({
            'apellido': 'Porras'
        }) //obtiene todos los documentos de la coleccion
        .select('nombre apellido -_id') // mostrar solos los paths especificados
        .exec((err, objetoUsuario) => {
            if (!objetoUsuario) { // no existe el documentos en la coleccion
                console.log(`No existen documentos en la coleccion: ${users}`);
                return res
                    .status(404)
                    .json({
                        "Mensaje": "No existen Usuarios en la coleccion"
                    });
            } else if (err) { // findById encontro un error
                console.log(`Se encontro un error en la coleccion: ${users}`);
                return res
                    .status(404)
                    .json(err);
            }
            console.log(`Se encontraron documentos en la coleccion ${users}`);
            res // Respondo enviando los documentos encontrados y status 200
                .status(200)
                .json(objetoUsuario);
        });
};
// Leer un usuario con userid
const userRead = (req, res) => {
    users
        .findById(req.params.userid) //obtiene el userid de los parámetros de la URL
        .exec((err, objetoUsuario) => {
            if (!objetoUsuario) { // no existe el documento con userid
                console.log(`Usuario no encontrado con id: ${req.params.userid}`);
                return res
                    .status(404)
                    .json({
                        "Mensaje": "Usuario no encontrado"
                    });
            } else if (err) { // findById encontro un error
                console.log(`Se encontro un error en el usuario con id: ${req.params.userid}`);
                return res
                    .status(404)
                    .json(err);
            }
            //console.log(`Se encontro el documento usuario con id: ${req.params.userid}`);
            res // Respondo enviando el documento encontrado y status 200
                .status(200)
                .json(objetoUsuario);
        });
};

// Modificación de un documento
const userUpdate = (req, res) => {
    if (!req.params.userid) {
        return res
            .status(404)
            .json({ "Mensaje": "Usuario no encontrado, ingrese un userid valido" });
    }
    users
        .findById(req.params.userid)
        .exec((err, objetoUsuario) => {
            if (!objetoUsuario) {
                return res
                    .status(404)
                    .json({ "Mensaje": "userid no encontrado" });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            objetoUsuario.nombre = req.body.nombre; // Modifico solo el path nombre
            objetoUsuario.apellido = req.body.apellido;
            objetoUsuario.direccion = req.body.direccion;
            objetoUsuario.edad = req.body.edad;
            objetoUsuario.telefono = req.body.telefono;
            objetoUsuario.materias.tipo = req.body.tipo;
            objetoUsuario.materias.nombres = [req.body.nombres];
            objetoUsuario.save((err, Users) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(Users);
                }
            });

        });
};
// Eliminar un documento
const userDelete = (req, res) => {
    if (req.params.userid) {
        users
            .findByIdAndDelete(req.params.userid)
            .exec((err, objetoUsuario) => {
                if (err) {
                    return res
                        .status(404)
                        .json(err);
                }
                res
                    .status(204)
                    .json(null);
            })
    } else {
        res
            .status(404)
            .json({ "Mensaje": "Ingrese el userid" });
    }
};

module.exports = {
    userCreate,
    userList,
    userRead,
    userUpdate,
    userDelete
}