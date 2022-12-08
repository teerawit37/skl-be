import mongoose from 'mongoose';


const authSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'instructor'],
        require: true,
        default: 'student'
    },
    university: {
        type: String,
        require: true,
    },
    firstname: {
        type: String,
        required: false,
        default: ''
    },
    lastname: {
        type: String,
        required: false,
        default: ''
    },
    nickname: {
        type: String,
        require: false,
        default: ''
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'lgbtq+', 'none'],
        require: false,
        default: 'none'
    },
    birthday: {
        type: String,
        require: false,
        default: ''
    },
    img: {
        type: String,
        require: false,
        default: ''
    }
})

// User model
const User = mongoose.model("User", userSchema)

export { User }