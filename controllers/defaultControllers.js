const { post } = require("../routes/adminRouter");
const Post = require("../models/posts");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const salts = 10;

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
        if(req.body.password != req.body.cnf_password){
            req.flash("error-message","Passwords do not match");
            res.redirect("/register");
        }
        User.findOne({email:req.body.email}).then(user => {
            if(user){
                req.flash("error-message","User with this email already exists.");
                res.redirect("/register");
            }
            else{
                const newUser = new User(req.body);

                bcrypt.hash(newUser.password,salts,(err,hash) => {
                    newUser.password= hash
                    newUser.save().then(user => {
                        req.flash("success-message","Successfully registered.");
                        res.redirect("/login");
                    });
                })
            }
        })

        
    },
    viewPost:(req,res) => {
        const id = req.params.postId;
        Post.findOne({_id:id}).lean().then(post => {
            res.render("default/post",{post:post});
        });
    }

};