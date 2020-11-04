const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({ // definicion del esquema
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    universidad: {
        type: String
    },
    direccion: {
        type: String
    },
    telefono: {
        type: Number,
        'default': 0
    },
    edad: {
        type: Number,
        'default': 1,
        min: 1,
        max: 100
    },
    materias: {
        tipo: {
            type: String,
            enum: ['Presencial', 'Virtual']
        },
        nombres: [String]
    },
    creado: {
        type: Date,
        default: Date.now
    }
});

const Usuario = new mongoose.model('user', usuarioSchema); //compila el esquema en un modelo
const user = new Usuario({
    nombre: 'Daniel',
    apellido: 'Porras',
    universidad: 'USFQ',
    direccion: 'Quito, Ecuador, South America',
    telefono: 099985265,
    edad: 10,
    materias: {
        tipo: 'Virtual',
        nombres: ['Desarrollo web 1', 'Desarrollo web 2', 'Desarrollo web 3']
    }
}); //Crear el documento

user.save(); // guardar en la DB