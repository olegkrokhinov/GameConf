const express =  require('express');
const router = express.Router();
controller = require('./authController');

const passport = require('passport');

checkAccessToken = [passport.authenticate('jwt', {session: false})];

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.post('/refresh', checkAccessToken, controller.refresh);

module.exports = router;