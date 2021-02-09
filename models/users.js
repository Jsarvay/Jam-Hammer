const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const User = new Schema({
    realName: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    profilePicture: {
        type:String,
        default: "b0383d76-a9c6-482e-80a1-38bc4bc772ec"
    },
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);