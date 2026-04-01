const mongoose = require('mongoose');
const schema= mongoose.Schema;
const userSchema = new schema({

    username: {
        type: String,
        required: true,   
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const todoSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

module.exports = {
    User: mongoose.model('User', userSchema),
    Todo: mongoose.model('Todo', todoSchema),
};
