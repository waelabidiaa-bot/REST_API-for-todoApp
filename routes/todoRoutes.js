const express = require('express');
const todoRouter = express.Router();
const { createTodo ,
        getTodos,
        deleteTodo,
        updateTodo,
        getsingleTodo,


} = require('../controllers/todoController');


// Todo routes
todoRouter.post('/', createTodo);

//get all todos for logged in user
todoRouter.get('/', getTodos);

// Get single todo by ID
todoRouter.get('/:id', getsingleTodo);





  





//delete route for single todo
todoRouter.delete('/:id', deleteTodo);



//update single todo
todoRouter.put('/:id', updateTodo);



module.exports = todoRouter;
