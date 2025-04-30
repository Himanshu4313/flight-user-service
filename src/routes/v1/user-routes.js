const express = require('express');
const {userController} = require('../../controllers');
const {createUserMiddleware, loginMiddleware , jwtTokenVarify  } = require('../../middleware');

const router = express.Router();


// This routes help to create new user 
router.post('/',
    createUserMiddleware.createUserValidate,
    userController.createUser);
 

    // user login 
router.post('/login',
        loginMiddleware.loginUserValidate,
        userController.login
);    

// user logout 
router.post('/profile-logout',
    jwtTokenVarify.jwtTokenVarify,
    userController.logout

);

// get user 

router.get('/:id',userController.getUser);

module.exports = router;


