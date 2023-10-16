const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

router.post('/signup', async (req, res) => {
    // Validate user input...
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    await user.hashPassword();
    await user.save();

    res.status(201).send(user);
});

router.post('/login', async (req, res) => {
    // Validate input...
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({ _id: user._id }, 'your_jwt_private_key'); 
    res.send({ token: token });
});

module.exports = router;
