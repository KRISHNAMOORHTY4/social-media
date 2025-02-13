const mongoose=require("mongoose")
const likeschema1 = new mongoose.Schema({
   
    userid:String,
    postid:String

});
const schema=mongoose.Schema({
   postdetails:[likeschema1]
    
})
module.exports=mongoose.model("Likeuser",schema)