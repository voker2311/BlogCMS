const { post } = require("../routes/adminRouter");
const Post = require("../models/posts");

module.exports = {
    index: (req,res) => {
        Post.find().lean().then(posts => {
            res.render("default/index",{posts:posts});
        })
        
    },
    loginGet:(req,res) => {
        res.render("default/login");
    },
    loginPost : (req,res) => {
        res.send("Submitted boi");
    },
    registerGet: (req,res) => {
        res.render("default/register");
    },
    registerPost: (req,res) => {
        res.send("Registered");
    },
    viewPost:(req,res) => {
        const id = req.params.postId;
        Post.findOne({_id:id}).lean().then(post => {
            res.render("default/post",{post:post});
        });
    }

};