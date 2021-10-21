const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 60,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 2000,
    },
    freelan: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    projectPhoto: {
        data: Buffer,
        contentType: String,
    },
    priority: {
        type: Number,
        default: 1
    }
},
    {timestamps: true},
);

module.exports = mongoose.model("Project", projectSchema);