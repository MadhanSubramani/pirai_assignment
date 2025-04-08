
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');
const universalFunc = require('../utils/universalFunc');

router.get('/todo/:limit/:skip',universalFunc.checkAccessTokenExpires, todoController.getAllTodo);
router.get('/todo/:id',universalFunc.checkAccessTokenExpires, todoController.getTodoUsingId);
router.post('/todo',universalFunc.checkAccessTokenExpires, universalFunc.checkTodoPayload, todoController.newTodo);
router.delete('/todo/:id',universalFunc.checkAccessTokenExpires, todoController.deleteTodo);
router.put('/todo/:id',universalFunc.checkAccessTokenExpires, todoController.updateTodo);

module.exports = router