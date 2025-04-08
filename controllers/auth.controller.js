const bcrypt = require('bcrypt');
const authRepo = require('../repository/auth.repo');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function signup(req,res) {
    try{
        let reqBody = req.body;
        let {name, userName, password} = reqBody;
        let checkUsernameExists = await authRepo.checkUsernameExists(userName);
        if(!checkUsernameExists){
            let encryptPassword = await bcrypt.hash(password, 8);
            let payload = {
                name,
                userName,
                password: encryptPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            await authRepo.saveNewUser(payload);
            return res.status(201).send({message: 'User created successfully'});
        }
        else 
        return res.status(400).send({message: 'Username already exists'});
    }
    catch(err){
        return res.status(400).send({message: err.message});
    }
}

async function login(req,res) {
try{
    let reqBody = req.body;
    let userDetails = await authRepo?.getUser(reqBody.userName);
    if(!userDetails) return res.status(400).send({message: "User doesn't exists"});

    const checkPassword = await bcrypt.compare(reqBody.password,userDetails.password);
    if(!checkPassword) return res.status(400).send({message: 'Invalid password'});

    const accessToken = jwt.sign(userDetails,process.env.TOKEN,{ algorithm: process.env.ALGORITHM, expiresIn: process.env.TOKEN_EXPIRE_TIME });
    return res.status(200).send({message: 'Successfully logged-in', token: accessToken});
}
catch(err){
    return res.status(400).send({message: err.message});
}
}

module.exports = {
    signup,
    login
};