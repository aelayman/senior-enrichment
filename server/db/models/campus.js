'use strict';

const db = require('../index');
const Sequelize = require('sequelize');

const Campus = db.define('campus', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        // set default value to be a default image
        defaultValue: 'https://i.imgur.com/AxH69n9.jpg'
    },
    description: {
        type: Sequelize.TEXT 
    }

});

module.exports = Campus;
