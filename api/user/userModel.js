const mongoose = require('mongoose');

const roleModel = require('./roleModel');

const message =  require('./userMessages');

const FRIEND_STATUS_REQUEST = 'request';
const FRIEND_STATUS_APPROVED = 'approved';
const FRIEND_STATUS_REJECTED = 'rejected';


const userSchema = new mongoose.Schema({
  login: String,
  passwordHash: String,
  name: String,
  age: Number,
  friends: [{
    friendId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'},
    status: String, 
  }],
  roles: 
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Role"
    }
  
});

userSchema.methods.addFriendRequest = function(friendId) {
  
  return new Promise((resolve, reject)=>{
    let friend =  this.friends.find(item => item.friendId == friendId);
   
    if (!friend) {
      friend = {friendId: friendId, status: FRIEND_STATUS_REQUEST};
      this.friends.push(friend);
      this.save();
      resolve(friend);
    };
        
    switch(friend.status) {
      case FRIEND_STATUS_REQUEST  : reject(new Error(ERROR_FRІEND_ALREADY_REQUESTED)); 
      case FRIEND_STATUS_APPROVED : reject(new Error(ERROR_FRІEND_ALREADY_APPROVED)); 
      case FRIEND_STATUS_REJECTED  : reject(new Error(ERROR_FRІEND_REJECTED));                 
    };

  });
};

userSchema.methods.approveFriendRequest = function(friendId) { 
  
  return new Promise((resolve, reject)=>{
    let friend =  this.friends.find(item => item.friendId == friendId);
    if (friend) {
      switch(friend.status) {
        case FRIEND_STATUS_APPROVED : {
          reject(new Error(ERROR_FRІEND_ALREADY_APPROVED)); 
          break;
        }
        default  : {
          friend.status = FRIEND_STATUS_APPROVED;
          this.save();
          resolve(friend);
        };
      };
    } else {
        reject(new Error(ERROR_FRIEND_NOT_FOUND)); 
    };

  });
};  

userSchema.methods.rejectFriendRequest = function(friendId){
  
  return new Promise((resolve, reject)=>{
    
    let friendArrayIndex= this.friends.findIndex(item => item.friendId == friendId);
    if (friendArrayIndex >= 0) {
        let friend = this.friends[friendArrayIndex];
        switch(friend.status) {
        case FRIEND_STATUS_REJECTED : {
          reject(new Error(ERROR_FRІEND_ALREADY_REJECTED)); 
          brake
        }; 
        default : {
          friend.status = FRIEND_STATUS_REJECTED;
          this.save();
          resolve(friend);
        };
      };
    } else {
          reject(new Error(ERROR_FRIEND_NOT_FOUND)); 
    };

  });
};

userSchema.methods.deleteFriendRequest = function(friendId) {

  return new Promise((resolve, reject)=>{

    let friendArrayIndex= this.friends.findIndex(item => item.friendId == friendId);
    if (friendArrayIndex >= 0) {
      this.friends.splice(friendArrayIndex, 1);
      this.save(); 
      resolve(friend);
    } else {
      reject(new Error(ERROR_FRIEND_NOT_FOUND)); 
    }; 
  });

};

userSchema.statics.findUserAndDoAnActionWithFriend = function(userId, friendId, actionWithFriend) {
  return new Promise((resolve, reject)=>{    
      this.findById(userId)
      .catch(()=>{throw new Error(ERROR_USER_NOT_FOUND)}) 
      .then((user)=>{return user[actionWithFriend](friendId)})
      .catch(reject)
      .then(resolve);
  });
};

module.exports = mongoose.model('User', userSchema, 'Users');