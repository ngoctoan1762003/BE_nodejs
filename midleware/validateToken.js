const jsonwebtoken = require('jsonwebtoken');
const env = require('dotenv');

function validateToken(req, res, next) {
    let {authorization} = req.headers
    if(authorization){
        const token = authorization.split(' ')[1];

        const {key} = req
        try{
            const isValid = jsonwebtoken.verify(token, process.env.secretKey, {
                algorithms: ['HS256'],
            });
            if(isValid){
                res.locals.userToken = isValid;
                return next();
            }
        }
        catch(e) {
            console.log(e)
            return res.status(401).json({
                err: 'Invalid token'
            })
        }
    }

}

module.exports = validateToken