'use strict';

const campusRouter = require('express').Router();
const { Campus, Student } = require('../db/models');

campusRouter.get('/', (req, res, next) => {
    Campus.findAll({
        order: [['id', 'ASC']]
    })
    .then(campuses => {
        res.json(campuses);
    })
    .catch(next);
});

campusRouter.get('/:campusId', (req, res, next) => {
    Campus.findOne({
        where: {
            id: req.params.campusId
        },
        include: {
            model: Student,
            as: "students"
        }
    })
    .then(campus => {
        res.json(campus);
    })
    .catch(next);
});

campusRouter.post('/', (req, res, next) => {
    if (req.body.imageUrl === "") {
        delete req.body.imageUrl; // removes key from object
    }
    Campus.create(req.body)
    .then(newCampus => {
        res.status(201).json(newCampus);
    })
    .catch(next);
});

campusRouter.put('/:campusId', (req, res, next) => {
    Campus.update(req.body, {
        where: {
            id: req.params.campusId
        }, returning: true
    })
    .spread((numAffectedRows, affectedRows) => {
        res.json(affectedRows[0]);
    })
    .catch(next);

});

campusRouter.delete('/:campusId', (req, res, next) => {
    Campus.destroy({
        where: {
            id: req.params.campusId
        }
    })
    .then( () => {
        res.status(204).send("");
    })
    .catch(next);
});

module.exports = campusRouter;

