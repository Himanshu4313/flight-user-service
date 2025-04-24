const express = require('express');
const {userController} = require('../../controllers');
const {createUserMiddleware, loginMiddleware  } = require('../../middleware');

const router = express.Router();


router.post('/',
    createUserMiddleware.createUserValidate,
    userController.createUser);
 
router.post('/login',
        loginMiddleware.loginUserValidate,
        userController.login
);    

module.exports = router;


