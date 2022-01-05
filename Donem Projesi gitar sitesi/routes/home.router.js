const express  = require('express'); 
const router = express.Router();

const HomeController = require('../controllers/home.controller');

router.get('/anasayfa',HomeController.openHomePage);

router.post('/adminlogin',HomeController.loginAdmin);

router.get('/admin',HomeController.openLoginAdmin);

router.get('/about',HomeController.openAboutPage);

router.get('/contact',HomeController.openContactPage);

router.get('/',HomeController.openLoginUser);

router.get('/openSignup',HomeController.OpensignupUser);

router.post('/signup',HomeController.signupUser);

router.post('/loginUser',HomeController.loginUser);

router.get('/sendmail',HomeController.sendMail);



module.exports =router;