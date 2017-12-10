'use strict';
const apiRouter = require('express').Router();

apiRouter.use('/campuses', require('./campuses'));
apiRouter.use('/students', require('./students'));

module.exports = apiRouter;

