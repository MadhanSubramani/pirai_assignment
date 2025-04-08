const todoRepo = require('../repository/todo.repo');
const mongoose = require('mongoose');

async function getAllTodo(req,res){
    try{
        let {limit, skip} = req.params;
        let result = await todoRepo.getTodoList(limit, skip); 
        return res.status(200).send(result);
    }
    catch(err){
        return res.status(400).send({message: err.message});
    }
}

async function getTodoUsingId(req,res){
    try{
        let {id} = req.params;
        let result = await todoRepo.getTodoByIdOrName({_id: new mongoose.Types.ObjectId(id), isActive: true}); 
        return res.status(200).send(result || {});
    }
    catch(err){
        return res.status(400).send({message: err.message});
    }
}

async function newTodo(req,res){
    try{
        let {todoName} = req.body;
        let todoDetails = await todoRepo.getTodoByIdOrName({todoName: { $regex: todoName, $options: 'i'}, isActive: true}); 
        console.log(todoDetails)
        if(todoDetails) return res.status(400).send({"message":"Todo already exists"});

        let payload = {
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true
        }
        let result = await todoRepo.saveTodo(payload); 
        console.log(result)
        return res.status(201).send({id: result.insertedId});
    }
    catch(err){
        return res.status(400).send({message: err.message});
    }
}

async function deleteTodo(req,res){
    try{
        let {id} = req.params;
        let result = await todoRepo.findTodoAndUpdate({_id: new mongoose.Types.ObjectId(id), isActive: true}, { isActive: false}); 
        if(!result) return res.status(400).send({message: 'Todo not found'});
        return res.status(200).send({message: 'Todo successfully deleted'});
    }
    catch(err){
        return res.status(400).send({message: err.message});
    }
}

async function updateTodo(req,res){
    try{
        let {id} = req.params;
        let payload = req.body;
        let result = await todoRepo.findTodoAndUpdate({_id: new mongoose.Types.ObjectId(id), isActive: true},payload); 
        if(!result) return res.status(400).send({message: 'Todo not found'});
        return res.status(200).send({message: 'Todo successfully updated'});
    }
    catch(err){
        return res.status(400).send({message: err.message});
    }
}

module.exports = {
    getAllTodo,
    getTodoUsingId,
    newTodo,
    deleteTodo,
    updateTodo
};