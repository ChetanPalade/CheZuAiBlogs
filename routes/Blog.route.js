const express = require('express')
const router = express.Router();
const { getAllPosts, addPost, updatePost, getById, deletePost, getByUserId} = require('../controllers/Post.controller');

router.get('/', getAllPosts)
router.post('/add', addPost)
router.put('/update/:id', updatePost)
router.get('/:id', getById)
router.delete('/:id', deletePost)
router.get('/user/:id', getByUserId)

module.exports = router