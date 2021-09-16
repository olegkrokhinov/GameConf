const roleModel = require('./api/user/roleModel');
const userModel = require('./api/user/userModel');

function removeAllRoles() {
    roleModel.deleteMany({}).exec();
}

function removeAllUsers() {
    userModel.deleteMany({}).exec();
}

exports.initDb = function () {
    roleModel.findOne({ name: 'user' }).exec()
        .then(role => {
            if (!role) {
                (new roleModel({ name: 'user' })).save();
            }
        })
        .catch(err => console.log(err.message))
}

