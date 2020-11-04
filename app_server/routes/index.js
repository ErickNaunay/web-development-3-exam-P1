const express = require('express'); 
const router = express.Router();
const ctrUsers = require('../controllers/users')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Examen No. 1',
        materia: 'Desarrollo web 3',
        examen: 'Examen de medio semestre.'
    });
});

/* GET Add User page. */
router.get('/addUser', function(req, res, next) {
    res.render('addUser');
});

/* POST Add User page. */
router.post('/addUser', ctrUsers.addUser);

/* GET Update User page. */
router.get('/changeUser', function(req, res, next) {
    res.render('changeUser');
});

/* POST Update User page. */
router.post('/changeUser', ctrUsers.getUserInfo);

/* PUT Update User page. */
router.put('/changeUser', ctrUsers.changeUser);

module.exports = router;