const {MongoClient} = require('mongodb');
require('dotenv').config();

const getTodoList = async(limit,skip) => {
    return await new Promise((resolve,reject) => {
        MongoClient.connect(process.env.MONGO_URL).then(async(client) => {
            let db = client.db(process.env.MONGO_DB);
            let result = await db.collection('mytodos').find({isActive: true}).sort({updatedAt: -1}).limit(+limit || 5).skip(+skip || 0).toArray();
            client.close();
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    });
}

const getTodoByIdOrName = async(match) => {
    return await new Promise((resolve,reject) => {
        MongoClient.connect(process.env.MONGO_URL).then(async(client) => {
            let db = client.db(process.env.MONGO_DB);
            let result = await db.collection('mytodos').findOne(match)
            client.close();
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    });
}

const saveTodo = async(payload) => {
    return await new Promise((resolve,reject) => {
        MongoClient.connect(process.env.MONGO_URL).then(async(client) => {
            let db = client.db(process.env.MONGO_DB);
            let result = await db.collection('mytodos').insertOne(payload);
            client.close();
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    });
}

const findTodoAndUpdate = async(match,payload) => {
    return await new Promise((resolve,reject) => {
        MongoClient.connect(process.env.MONGO_URL).then(async(client) => {
            let db = client.db(process.env.MONGO_DB);
            let result = await db.collection('mytodos').findOneAndUpdate(match, { $set: payload })
            client.close();
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports = {
    getTodoList,
    getTodoByIdOrName,
    saveTodo,
    findTodoAndUpdate
}