const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const employees = require('./routes/employees');
const app = express();

mongoose.connect('mongodb://localhost/comp3123_assignment1', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/v1/user', users);
app.use('/api/v1/emp/employees', employees);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ status: false, message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
