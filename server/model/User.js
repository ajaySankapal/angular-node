const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide the users first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please provide the users last name']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide the users email.']
    },
    password: {
        type: String,
        required: [true, 'Please provide the users password'],
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    role: {
        type: String,
        enum: ['admin', 'user']
    }
})

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema)