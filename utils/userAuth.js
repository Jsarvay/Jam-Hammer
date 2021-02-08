const JWT = require("jsonwebtoken");
const usersModel = require("../models/users");

module.exports = {
    authUser: function (req) {
        var returnPromise = new Promise((resolvedFunc, errFunc) => {
            if (!req.headers.authorization) {
                errFunc("NO_AUTH");
                return;
            }
            var jwtkey = req.headers.authorization.substring(req.headers.authorization.indexOf("Bearer ") + 7);
            console.log(jwtkey);
            var decoded = null;
            try {
                decoded = JWT.verify(jwtkey, process.env.JWT_SECRET);
            } catch (err) {
                if (err instanceof JWT.TokenExpiredError) {
                    errFunc("EXP_TOKEN")
                    return;
                }
                console.log(err);
                errFunc("BAD_KEY");
                return;
            }
            console.log(decoded);
            usersModel.findById(decoded.userId).then((userFound) => {
                if(userFound != null){
                    resolvedFunc(userFound);
                }else{
                    errFunc("USER_NOT_REAL");
                }
            });
        });
        return returnPromise;
    }
}
