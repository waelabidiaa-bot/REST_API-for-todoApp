const express = require('express');
const Router = express.Router();
const { createUser,
    loginUser
 } = require('../controllers/userController');


//register route
Router.post('/register', createUser);



//login route
Router.post('/login', loginUser);
    


module.exports = Router;