'use strict'
const apiRouter = require('express').Router()
//const db = require('../db')

apiRouter.use('/campuses', require('./campuses'));
apiRouter.use('/students', require('./students'));

module.exports = apiRouter; 
