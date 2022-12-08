"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const authSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
// User Schema
const userSchema = new mongoose_1.default.Schema({
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
});
// User model
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
//# sourceMappingURL=user.js.map