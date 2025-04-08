
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.checkSignUpPayload = (req, res, next) => {
    const {name,userName,password} = req.body;
    if(name.trim().length < 3 || userName.trim().length < 3 || password.trim().length < 8)
        return res.status(400).send({message: 'Enter valid credentails'});
    next();
}

exports.checkAccessTokenExpires = (req,res,next) => {
    const accessToken = req.headers.authorization;
    if(!accessToken) return res.status(400).send({message: 'Token not found'});

    const token = accessToken.replace('Bearer ', '');
    jwt.verify(token, process.env.TOKEN, (err,data) => {
        if(err){
            return res.status(400).send({message: 'Invalid token'});
        }
        next();
    });
}

exports.checkTodoPayload = (req,res,next) => {
    const {todoName,status} = req.body;
    if(todoName.trim().length < 3 || status.trim().length < 3 )
        return res.status(400).send({message: 'Enter valid input'});
    next();
};