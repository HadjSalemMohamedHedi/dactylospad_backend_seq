var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = "14moh#ht74879";


var token = jwt.sign({ foo: 'bar' }, JWT_SIGN_SECRET);
module.exports = {
    generateTokenforUser: function (userData) {
        return jwt.sign({
            UserId: userData.id,
            Role: userData.Role

        }, JWT_SIGN_SECRET, { expiresIn: '24h' });



    },
    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer', '') : null;
    },
    getUserId: function (authorization) {
        var userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null) {
                    userId = jwtToken.userId;
                }
            } catch (eur) {

            }
        }
    }
}