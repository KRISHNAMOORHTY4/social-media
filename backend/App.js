const express = require("express")
const mongoose = require("mongoose")
const UserRouter = require("./Routes/UserRouter")
const PostRouter=require("./Routes/PostRoutes")
const LikeRouter=require("./Routes/LikeRouter")
const cors = require('cors')
const app = express()
const port = 3001
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://127.0.0.1:27017/post")
app.use(UserRouter)
app.use(PostRouter)
app.use(LikeRouter)





app.listen(port, () => {
    console.log(`server running on ${port}`);

})