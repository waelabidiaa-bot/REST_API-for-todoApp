const { User } = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// function for user creation
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'username, email, and password are required' });
    }

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'defaultsecret', {
      expiresIn: '1d',
    });

    res.status(201).json({
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Error registering user' });
  }
};







//function for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'defaultsecret', {
      expiresIn: '1h',
    });

    res.json({
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Error logging in user' });
  }
};



module.exports = {
    createUser
    , loginUser
}
    