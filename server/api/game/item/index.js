const express = require('express');
const router = express.Router();
const controller = require('./itemController')

const passport = require('passport');
const auth = require('../../auth/auth.js')

//checkAccessTokenAndUserRole = [passport.authenticate('jwt', { session: false }), auth.isUser];
checkAccessToken = [passport.authenticate('jwt', { session: false })];

router.get('/', checkAccessToken, controller.getItems);
router.get('/:itemId', checkAccessToken, controller.getItem);
router.post('/', checkAccessToken, controller.addItem);
router.put('/', checkAccessToken, controller.updItem);
router.delete('/:itemId', checkAccessToken, controller.delItem);

module.exports = router;