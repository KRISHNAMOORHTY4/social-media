const mongoose = require("mongoose")
const commentschema1 = new mongoose.Schema({
    comments: String,
    username:{
        type:String,
        
    },
    commentID:String

});

const schema = mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    post: {
        type: String,
        minlength: [100]

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comment: [commentschema1],
    author:{
        type:String,
        required:true
    }

})
module.exports = mongoose.model("Post", schema)