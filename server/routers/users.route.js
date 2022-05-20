const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/2',userController.get);
router.post('/2',userController.post);
router.post('/signup',userController.signup);
router.post('/login', userController.login);
router.post('/typebattery', userController.post2);
router.post('/result', userController.post3);

router.get('/promise', userController.promise);
router.get('/async_await', userController.async_await);

router.get('/generateSecretKey',  userController.generateSecretKey);
router.get('/fakelogin', userController.fakelogin);
// router.get('/getToken',authenticateToken, userController.getToken);




module.exports = router;