const mongoose = require('mongoose');
const { Schema } = mongoose;
const taskPostSchema = new Schema({
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
    //shows the userId of the person who has posted this task
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
       // required: true,
    },
    freelan: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    comments: {
        type: String,
        default: "",
    },
    //incomplete and not being worked on -> 1
    //incomplete and being worked upon -> 2
    //completed -> 3
    activeStatus: {
        type: Number,
        default: 1,
    },

    status: {
        type: String,
        default: "1",
    },
    rating: {
        type: Number,
        default: 5,
    },
    acceptedApplicant:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    techStack: [String],
    pay : {
        type:String,
    }
},
    {timestamps: true},
);


module.exports = mongoose.model("TaskPost", taskPostSchema);