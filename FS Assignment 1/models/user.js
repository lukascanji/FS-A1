const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, maxlength: 50 },
    password: { type: String, required: true, maxlength: 50 }
});

userSchema.methods.hashPassword = async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
