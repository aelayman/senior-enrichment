'use strict';

const studentRouter = require('express').Router();
const { Student, Campus } = require('../db/models');


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
        return Student.findOne({
            where: {
                id: newStudent.id
            },
            include: {
                model: Campus,
                as: "campus"
            }
        });
    })
    .then(newStudent => {
        res.status(201).json(newStudent);
    })
    .catch(next);
});

studentRouter.put('/:studentId', (req, res, next) => {
    Student.update(req.body, {
        where: {
            id: req.params.studentId
        }
    }) //now i need to get that student data including its campus
    .then(() => {
        return Student.findOne({
            where: {
                id: req.params.studentId
            },
            include: {
                model: Campus,
                as: "campus"
            }
        });
    })
    .then(updatedStudent => {
        res.json(updatedStudent);
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


module.exports = studentRouter;

