const express = require("express")
const LikeRouter = express.Router()
const like = require("../modal/LikeSchems")


LikeRouter.post("/like", async (req, res) => {
    try {

        const finduser = await like.findOne({ postdetails: { $elemMatch: { userid: req.body.user, postid: req.body.postid } } })
        if (finduser) {
            await like.deleteOne(finduser)
            res.json("deleted")
        }
        else {
            const newlike = await new like({
                postdetails: [{ userid: req.body.user, postid: req.body.postid }]
            })
            if (!newlike) {
                res.status(400).json("no user")
            }
            const savedlike = await newlike.save()
            if (savedlike) {
                res.json("added")
            }

        }




    }
    catch (err) {
        res.status(400).json(err.message)
    }

})
LikeRouter.get("/likeall", async (req, res) => {
    try {
        const dataall = await like.find()
        if (dataall) {
            res.json(dataall)
        }

    }
    catch (err) {
        res.status(400).json(err.message)
    }

})





module.exports = LikeRouter