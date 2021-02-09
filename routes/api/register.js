const router = require('express').Router();
const userController = require('../../controllers/userController');
const userModel = require("../../models/users");
const JWT = require("jsonwebtoken");

function registerUser(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var realName = req.body.realName;
    console.log("User: " + username + " is trying to register");
    userModel.register({ username: username, realName: realName, email:email }, password, function (err, user) {
        if (err) {
            console.log("Error creating user in database: " + username);
            console.log(err);
            var sendBack = { result: "fail", reason: err};
            res.json(sendBack);
            return;
        }
        var authenticate = userModel.authenticate();
        authenticate(username, password, function (err, result) {
            if (err) {
                console.log("error authenticating user: " + username);
                var sendBack = {result: "fail", reason: err};
                res.json(sendBack);
            }
            if (result != false) {
                console.log("User: " + username + " successfully authenticated");
                console.log(result);
                var token = JWT.sign({exp: Math.floor(Date.now() / 1000) + (360*60*60),
                    userId: result._id
                }, process.env.JWT_SECRET, {algorithm: "HS512"});
                var sendBack = {
                    token: token,
                    result: "success"
                };
                res.json(sendBack);
            } else {
                console.log("error authenticating user: " + username);
                var sendBack = { result: "fail", reason: "bad username or password" };
                res.json(sendBack);
            }
            // Value 'result' is set to false. The user could not be authenticated since the user is not active
        });
    });
} 


//  '/api/register'
router.route('/').post(registerUser);

module.exports = router;