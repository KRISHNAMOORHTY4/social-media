const express = require("express")
const postrouter = express.Router()
const post1 = require("../modal/PostSchema")

postrouter.post("/post", async (req, res) => {
    try {

        const newpost = await new post1({
            Title: req.body.Title,
            post: req.body.Post,
            comment: [{ comments: req.body.comment, username: req.body.username, commentID: req.body.commentID }],
            author: req.body.name

        })
        const savedata = await newpost.save()
        if (!savedata) {
            res.status(400).json("error")
        }
        res.json(savedata)
    }
    catch (err) {
        res.status(400).json(err.message)
    }
})


postrouter.get("/getall", async (req, res) => {
    try {
        const findpost = await post1.find()
        if (!findpost) {
            res.status(400).json("NO Post")
        }
        res.json(findpost)
    }
    catch (err) {
        res.status(400).json(err.message)
    }
})

postrouter.delete("/delete/:id", async (req, res) => {
    try {
        const deletedata = await post1.deleteOne({ _id: req.params.id })
        if (deletedata) {
            res.json("delete post")
        }

    }
    catch (err) {
        res.status(400).json(err.message)
    }
})
postrouter.patch("/patch",async(req,res)=>{
    try{
    const update=await  post1.updateOne({_id:req.body._id},{ $push: { comment: [{comments: req.body.comment, username: req.body.username}] } })
     if(update){
        res.json(update)
     }

    }
    catch(err){
        res.status(400).json(err.message)
    }

})



module.exports = postrouter