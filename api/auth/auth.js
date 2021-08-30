const userModel = require('../user/userModel');
const roleModel = require('../user/roleModel');

exports.isAdmin = (req, res, next) => {
    return isRole('admin', req, res, next);
};

exports.isModerator = (req, res, next) => {
    return isRole('moderator', req, res, next);
};

exports.isUser = (req, res, next) => {
  return isRole('user', req, res, next);
};

isRole = (role, req, res, next) => {
  
  const user = req.user;
  
  if (!user) {
    return;
  };

  roleModel.find({_id: { $in: user.roles }}).exec()
    .then(roles =>{
      for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === role) {
            return next();
          }
      }
      res.status(403).send('Require '+ role +' role!');
    })
    .catch(err => {
      res.status(500).send(err.message);   
    }) 
      
};