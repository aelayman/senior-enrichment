'use strict';

const studentRouter = require('express').Router();
const { Student, Campus } = require('../db/models'); // might need more models later


studentRouter.get('/', (req, res, next) => {
    Student.findAll({
        order: [['id', 'ASC']],
        include: {
            model: Campus,
            as: "campus"
         }
    })
    .then(students => {
        res.json(students);
    }) 
    .catch(next);
});

studentRouter.get('/:studentId', (req, res, next) => {
    Student.findOne({
        where: {
            id: req.params.studentId
        },
        include: {
            model: Campus,
            as: "campus"
        }
    })
    .then(student => {
        res.json(student);
    })
    .catch(next);
});

studentRouter.post('/', (req, res, next) => {
    Student.create(req.body)
    .then(newStudent => {
        res.status(201).json(newStudent);
    })
    .catch(next);
});

studentRouter.put('/:studentId', (req, res, next) => {
    Student.update(req.body, {
        where: {
            id: req.params.studentId
        }, returning: true
    })
    .spread((numAffectedRows, affectedRows) => {
        res.json(affectedRows[0]);
    }) 
    .catch(next);
});

studentRouter.delete('/:studentId', (req, res, next) => {
    Student.destroy({
        where: {
            id: req.params.studentId
        }
    })
    .then( () => {
        res.status(204).send("");
    })
    .catch(next);
});


module.exports = studentRouter; // why do i need to export this? who is using?
