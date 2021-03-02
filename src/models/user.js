const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./tasks');
const config = require('./../../config/config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        required: false,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot be password');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
});

// create a virtual attribute to make it seem like the tasks are stored in the user
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});

// methods are acessible on the instance (particular user)
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, config.jwt_secret);

    // set and save token
    user.tokens = user.tokens.concat({ token: token });
    await user.save();

    return token;
}

// only returns the parts of the user that we want to publicaly expose
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
}

// statics are accessible on the model (the entire class)
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login!');
    }
    // verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login!');
    }

    return user;
}

// This is the middleware that runs before saving the model, it hashes plain text password
userSchema.pre('save', async function (next) {
    const user = this;

    // hash password if it's been modified
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    // this saves the user
    next();
});

// delete user tasks when user is deleted
userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({
        owner: user._id
     });
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;