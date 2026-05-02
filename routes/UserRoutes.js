const express = require('express');
const router = express.Router();

const{register, login, profile} = require('../controllers/Usercontroller');
const auth = require('../middlleware/authmiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, profile);


module.exports = router;