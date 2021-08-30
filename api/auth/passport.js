const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('../user/userModel');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : process.env.SECRET
};

module.exports = app => {
  app.use(passport.initialize());
  
  passport.use(new JwtStrategy(options, function(jwt_payload, done) {
    userModel.findOne({_id: jwt_payload.userId}).exec()
      .then(user => {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
      })
      .catch(err => done(err, false))
  }));

}