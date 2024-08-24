const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title : { type: String, required: true },
    description : { type: String, required: true },
    image : { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, 
            ref:"User",
            required: true},
            
}  , { timestamps: true }
)

const Post = mongoose.model("Post", postSchema) //in mongoDB table name will be users
module.exports = Post
