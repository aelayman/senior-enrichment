'use strict';

const db = require('../index');
const Sequelize = require('sequelize');


const Student = db.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }

    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    gpa: {
        type: Sequelize.FLOAT,
        validate: {
            min: 0.0,
            max: 4.0
        }
    }
}, {
    getterMethods: {
        name () {
            return this.getDataValue("firstName") + " " + this.getDataValue("lastName");
        },
        gpaFormat () {
            if (this.getDataValue("gpa") % 1 === 0) {
                return this.getDataValue("gpa") + ".0";
            } else {
                return this.getDataValue("gpa");
            }
        }
    }
});

module.exports = Student;
