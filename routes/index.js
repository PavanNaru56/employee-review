
// main routes folder that connects the review and user routes
const express = require('express');

const router = express.Router();
//import the usercontroller
const UserController = require('../controllers/users_controller');
//routes the user routes and review routes
router.use('/',require('./users'));
router.use('/review',require('./reviews'));
module.exports = router;