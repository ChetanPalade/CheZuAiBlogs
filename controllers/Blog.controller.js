const Post = require('../models/Post.model')
const User = require('../models/User.model')
const mongoose = require('mongoose')


// GET ALL POST
exports.getAllPosts = async (req, res, next) => {
    let posts
    try {
        posts = await Post.find().populate('user').sort({updatedAt: -1})
    } catch (error) {
        return console.log(error)
    }
    if (!posts){
        return res.status(404).json({message: 'No Posts found'})
    }
    return res.status(200).json({posts:posts})
}

//CREATE A NEW POST
exports.addPost = async (req, res, next) => {
    const { title, description, image, user} = req.body
    let existingUser
    try {
        existingUser = await User.findById(user)
    } catch (error) {
        return console.log(error)
    }

    if(!existingUser) {
        return res.status(400).json({ message:"Unable to find user by this ID"})
    }

    const post = new Post({
        title, 
        description, 
        image, 
        user
    })

    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await post.save({session})
        existingUser.posts.push(post)
        await existingUser.save({session})
        await session.commitTransaction()
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error})
    }
    return res.status(200).json({post})
}


//UPDATED THE POST

exports.updatePost= async (req, res, next) => {
    const { title, description, image} = req.body
    const postID = req.params.id;
    let post
    try {
        post = await Post.findByIdAndUpdate(postID, {
            title, 
            description,
            image
        })
    } catch (error) {
        return console.log(error)
    }
    if (!post){
        return res.status(500).json({message: 'Unable to update post'})
    }
    return res.status(200).json({post:post})

}

//GET SINGLE POST
exports.getById = async (req, res, next) => {
    const ID = req.params.id
    let post
    try {
        post = await Post.findById(ID)
    } catch (error) {
        return console.log(error)
    }
    if (!post){
        return res.status(404).json({message: 'No post found'})
    }
    return res.status(200).json({post:post})
}

//DELETE THE POST

exports.deletePost = async (req, res, next) => {
    const ID = req.params.id
    let post
    try {
        post = await Post.findByIdAndRemove(ID).populate('user')
        await post.user.posts.pull(post)
        await post.user.save()
    } catch (error) {
        return console.log(error)
    }
    if (!post){
        return res.status(500).json({message: 'Unable to delete post'})
    }
    return res.status(200).json({message: 'Post deleted'})
}
//.sort({updatedAt: -1})

exports.getByUserId = async (req, res, next) => {
    const userId = req.params.id
    let userPosts
    try {
        userPosts = await User.findById(userId).populate({path:'posts',options:{ sort:{updatedAt : -1}}})
        //console.log(userPosts)
    } catch (error) {
        return console.log(error)
    }
    if(!userPosts){
        return res.status(404).json({message: 'No Posts found'})
    }
    return res.status(200).json({user: userPosts})
}