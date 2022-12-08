import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    university: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    }
})

const Course = mongoose.model("Course", courseSchema)

export { Course }