const Todo = require('../models/Todo');

async function addTodo(req, res){
  try {

const body = req.body;
const title = body.title;
const description = body.description;
const deadline = Date(body.deadline);


    const newTodo = await Todo.create({
      title,
      description,
      deadline
    });
    res.status(200).json(newTodo);
  } catch (error) {
    console.log('cant add data: ', error.message);
    res.status(401).json({message: 'Cant add data'});
  }  
}

async function deleteTodoById(req, res){
  const todoId = req.params.todoId;
  try {
    await Todo.findByIdAndDelete(todoId);
    res.status(200).json({message: 'Todo has been deleted'});
  } catch (error) {
    console.log('cant delete: ', error.message);
    res.status(401).json({error: error.message});
  }
}

async function updateTodoById(req, res){
  const todoId = req.params.todoId;
  const body = req.body;
  try {
    await Todo.findByIdAndUpdate(todoId, body);
    res.status(200).json({message: 'Todo is updated'});
  } catch (error) {
    console.log('Cant update: ', error.message);
    res.status(401).json({error: error.message});
  }
}

async function getTodoById(req, res){
  try {
    const todo = await Todo.findById(req.params.todoId);
    res.status(200).json(todo);
  } catch (error) {
    console.log('cant get todo: ', error.message); 
    res.status(401).json({error: error.message});   
  }
}

async function getAllTodos(req, res){
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.log('cant get data: ', error.message);
    res.status(401).json({error: error.message});
  }
}
module.exports = {
  getAllTodos, 
  addTodo, 
  updateTodoById, 
  deleteTodoById,
  getTodoById
}