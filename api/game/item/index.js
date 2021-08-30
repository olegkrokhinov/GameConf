const express =  require('express');
const router = express.Router();
const controller = require('./itemController')

const passport = require('passport');
const auth = require('../../auth/auth.js')

checkAccessTokenAndUserRole = [passport.authenticate('jwt', {session: false}), auth.isUser];


router.get('/', checkAccessTokenAndUserRole, controller.getItems);
router.get('/:itemId', checkAccessTokenAndUserRole, controller.getItem);
router.post('/', checkAccessTokenAndUserRole, controller.addItem);
router.put('/', checkAccessTokenAndUserRole, controller.updItem);
router.delete('/:itemId', checkAccessTokenAndUserRole, controller.delItem);

module.exports = router;