const userModel = require('../user/userModel');
const roleModel = require('../user/roleModel');
const jwt = require('jsonwebtoken');
bcrypt = require('bcrypt')
const secret = process.env.SECRET;


exports.refresh = function(req, res){
  if (!req.user) {
        return res.status(404).send({ message: "User Not found." });
      } 
  
  let jwtAccessToken = jwt.sign(
      {userId: req.user._id}, 
      secret, 
      {expiresIn: '1h'}
  );

  res.status(200).send({
        userId: req.user._id,
        userName: req.user.name,
        userLogin: req.user.login,
        userRoles: req.user.roles,
        userAccessToken: 'Bearer '+ jwtAccessToken
      });

}

exports.login = function(req, res) {
  userModel.findOne({login: req.body.userLogin})
    .populate("roles")
    .exec()
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      if (!bcrypt.compareSync(req.body.userPassword, user.passwordHash)) {
        return res.status(401).send({ jwtAccessToken: null, message: "Invalid Password!"});   
      }

      let jwtAccessToken = jwt.sign(
        {userId: user._id}, 
        secret, 
        {expiresIn: '1h'}
      );

      res.status(200).send({
        userId: user._id,
        userName: user.name,
        userLogin: user.login,
        userRoles: user.roles,
        userAccessToken: 'Bearer '+ jwtAccessToken
      });
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    })
};      
 

exports.logout = function(req, res) {
  res.status(200).send('');  
};

exports.signup = function(req, res) {
  
  let user = new userModel({
    login: req.body.userLogin,
    passwordHash: bcrypt.hashSync(req.body.userPassword, 8),
  });

  let userSave =  () => {
    user.save()
    .then((user) => {
      res.status(200).send({ message: "User was registered successfully!" })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  }

  if (req.body.roles) {
    roleModel.find({name: { $in: req.body.roles }}).exec()
      .then((roles) => {
        user.roles = roles.map(role => role._id);
        userSave();
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    roleModel.findOne({ name: "user" })
      .then(role => {
        user.roles.push(role._id);
        userSave();
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }    
};