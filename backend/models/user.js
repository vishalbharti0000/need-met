const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv4 = require("uuid/v4");
// const TaskPost = require('./taskPost');
// const Project = require('./projects');


const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 40,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    encryptedPassword: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        maxLength: 3000,
    },
    salt: String,
    //0 for client,1 for freelancer
    role: {
        type: Number,
        default: 0,
    },
    profession :{
        type:String,
        default:"Client",
    },
    skills : [String],

    profilePhoto: {
        data: Buffer,
        contentType: String,
    }  
},
    {timestamps : true},
);

userSchema.virtual("password").set(
    function(password) {
        this._password = password;
        this.salt = uuidv4();
        this.encryptedPassword = this.securePassword(this._password);
    }
).get(
    function() {
        return this._password;
    }
);

userSchema.virtual("averageRating").set(
    function(){
        this.averageRating = undefined;
        //ProjectRating for freelancer
        if(this.role === 1){
            let sumRating = 0;
            for(let i=0;i<(this.projects).length;i++){
                sumRating += (this.projects[i]).rating;
            }
            this.averageRating = (sumRating)/(this.projects).length;
        }
    }
);

userSchema.methods = {

    authenticate: function(nonEncryptedPassword){
        return this.securePassword(nonEncryptedPassword) === this.encryptedPassword;
    },

    securePassword: function(nonEncryptedPassword){
        if(!nonEncryptedPassword){
            return "";
        }
        try{
            return crypto.createHmac('sha256', this.salt).update(nonEncryptedPassword).digest('hex');
        }catch(err){
            return "";
        }
    },
};

module.exports = mongoose.model("User", userSchema);