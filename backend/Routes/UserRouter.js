const express = require("express")
const userroutes = express.Router()
const User = require("../modal/Userschema")
const bycrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const key = "KRISH"


userroutes.get("/user", (req, res) => {
    User.find((err, data) => {
        res.send(data)
    })

})
userroutes.post("/register", async (req, res) => {


    try {
        const exits = await User.findOne({ email: req.body.email })
        if (exits) {
            return res.status(401).json("Email already exits")
        }
        const fliterpassword = await bycrypt.hash(req.body.password, 10)
        //password hash
        const newUser = await new User({
            name: req.body.name,
            email: req.body.email,
            password: fliterpassword,

        })
        const data = await newUser.save()
        res.json(data)
    }
    catch (err) {
        res.status(401).json(err)

    }

})
userroutes.post("/login", async (req, res) => {
    try {
        const userdata = await User.findOne({ email: req.body.email })
        if (!userdata) {
            return res.status(400).json("email not found")
        }
        const valipaswd = await bycrypt.compare(req.body.password, userdata.password)
        if (!valipaswd) {
            return res.status(400).json("password incorrect")
        }
        const token = await jwt.sign({ email: userdata.email }, key)
        res.json({ token: token, userdata: userdata })

    }
    catch (err) {
        res.status(400).send(err)
    }
})


userroutes.patch("/getvalue",async(req,res)=>{
   try{
    const updatavalue=await User.updateOne({_id:req.body.id},{$set:{email:req.body.email,name:req.body.name}})
    if(updatavalue){
        res.json("Successful update")
    }
   }
   catch(err){
    res.status(400).json(err.message)
   }

})

userroutes.get("/getone",async(req,res)=>{
  try{
    const getdata=await User.find()
    if(getdata){
     res.json(getdata)
    }
  }
  catch(err){
    res.status(400).json(err.message)
  }
})








module.exports = userroutes