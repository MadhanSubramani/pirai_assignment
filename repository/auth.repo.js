
const {MongoClient} = require('mongodb');
require('dotenv').config();

const checkUsernameExists = async(userName) => {
    return await new Promise((resolve,reject) => {
        MongoClient.connect(process.env.MONGO_URL).then(async(client) => {
            let db = client.db(process.env.MONGO_DB);
            let result = await db.collection('users').findOne({userName : { $regex: userName , $options : 'i'}});
            client.close();
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    });
}

const saveNewUser = async(payload) => {
    return await new Promise((resolve,reject) => {
        MongoClient.connect(process.env.MONGO_URL).then(async(client) => {
            let db = client.db(process.env.MONGO_DB);
            await db.collection('users').insertOne(payload);
            client.close();
            resolve();
        }).catch((err) => {
            reject(err);
        })
    });
}

const getUser = async(userName) => {
    return await new Promise((resolve,reject) => {
        MongoClient.connect(process.env.MONGO_URL).then(async(client) => {
            let db = client.db(process.env.MONGO_DB);
            let result = await db.collection('users').findOne({userName});
            client.close();
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports = {
    checkUsernameExists,
    saveNewUser,
    getUser
};