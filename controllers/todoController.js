const { Todo } = require('../database/db');





//function for creating todo for logged in user
const createTodo = async (req, res) => {
    const userId = req.user?.userId;
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: 'title and description are required' });
    }
    try {
        const todo = await Todo.create({ userId, title, description });
        res.status(201).json(todo);
    } catch (err) {
        console.error('Error creating todo:', err);
        res.status(500).json({ message: 'Server error' });
    }
};





//get all todos for logged in user
const getTodos = async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const todos = await Todo.find({ userId });
        res.status(200).json(todos);
    } catch (err) {
        console.error('Error fetching todos:', err);
        res.status(500).json({ message: 'Server error' });
    }
};





//delete single todo for logged in user
const deleteTodo = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.userId;
    try {
        const todo = await Todo.findOne({ _id: id, userId });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found or access denied' });
        }
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        console.error('Error deleting todo:', err);
        res.status(500).json({ message: 'Server error' });
    }
};




//update single todo for logged in user
const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const userId = req.user?.userId;
    if (!title || !description) {
        return res.status(400).json({ message: 'title and description are required' });
    }
    try {
        const todo = await Todo.findOne({ _id: id, userId });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found or access denied' });
        }
        const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description }, { new: true });
        res.status(200).json(updatedTodo);
    } catch (err) {
        console.error('Error updating todo:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

    

const getsingleTodo = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.userId;
    try {
        const todo = await Todo.findOne({ _id: id, userId });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found or access denied' });
        }
        res.status(200).json(todo);
    } catch (err) {
        console.error('Error fetching todo:', err);
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = {
    createTodo,
    getTodos,
    deleteTodo,
    updateTodo,
    getsingleTodo
}