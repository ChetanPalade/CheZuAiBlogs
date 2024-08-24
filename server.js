const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
//const bodyParser = require("body-parser")
require('dotenv').config({path: '.env'});

const port = process.env.PORT || 8080
const DB = process.env.DB_URL;
const app = express();
app.use(cors())


//app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB).then(()=> console.log("MongoDB connected")).catch((err)=> console.log(err))

app.use(express.json())

app.get('/', (req, res) => {
    res.json("Server ")
})

const userRouter = require('./routes/User.route')
app.use('/api/user',userRouter)


const postRouter = require('./routes/Post.route')
app.use('/api/post',postRouter)


app.listen(port, () => {
    console.log("Server Started at Port " + port)
})