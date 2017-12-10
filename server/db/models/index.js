'use strict';

const db = require('../index');
const Campus = require('./campus');
const Student = require('./student');

// Associations
Student.belongsTo(Campus, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Campus.hasMany(Student, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' }); //this is how I can then also delete all the associated students. must include in both associations

module.exports = {
	db,
	Campus,
	Student
};
