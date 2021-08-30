const express =  require('express');
const router = express.Router();
const userModel = require('./userModel');
const controller = require('./userController')

const passport = require('passport');
const auth = require('../auth/auth.js')

checkAccessTokenAndUserRole = [passport.authenticate('jwt', {session: false}), auth.isUser];


router.get('/', checkAccessTokenAndUserRole, controller.getUsers);
router.get('/:user', checkAccessTokenAndUserRole, controller.getUser);
router.put('/:user', checkAccessTokenAndUserRole, controller.updateUser);
router.post('/', checkAccessTokenAndUserRole, controller.addUser);
router.delete('/', checkAccessTokenAndUserRole, controller.deleteUser);

//router.get('/:user/friends', checkAccessTokenAndUserRole, controller.getUserFriends);  
//router.post('/:User/friends', checkAccessTokenAndUserRole, controller.addFriendRequest);
//router.put('/:user/friends/:friend', checkAccessTokenAndUserRole, controller.approveFriendRequest);
//router.delete('/:user/friends/:friend', checkAccessTokenAndUserRole, controller.rejectFriendRequest);
//router.delete('/:user/friends', checkAccessTokenAndUserRole, controller.deleteFriendRequest);

module.exports = router;