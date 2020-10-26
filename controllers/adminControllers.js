const Post = require("../models/posts");
const { isEmpty } = require("../config/customFunctions"); 

module.exports = {
    index:(req,res) => {
        res.render("admin/index");
    },
    posts:(req,res) => {
        Post.find().lean().then(posts => {
            res.render("admin/posts/index",{posts:posts});
        })
    },
    compose:(req,res) => {
        res.render("admin/posts/compose");
    },
    composePost:(req,res) => {
        let filename = ""
        if(!isEmpty(req.files)){
            let file = req.files.fileUpload;
            filename = file.name;
            let uploadDirectory = "./public/uploads/";

            file.mv(uploadDirectory+filename,(err) => {
                if(err){
                    throw err;
                }
            })
        }
        const newPost = new Post({
            title:req.body.title,
            author:req.body.authorName,
            description:req.body.description,
            file: `/uploads/${filename}`,
        });

        newPost.save().then(post => {
            console.log(post);
            req.flash('success-message',"Post created successfully")
            res.redirect("/admin/posts");
        });

    },
    editPost:(req,res) => {
        const id = req.params.edit_id;
        Post.findById(id).lean().then(post => {
            res.render("admin/posts/edit",{post:post});
        })
    },

    updatePost:(req,res) => {
        const Id = req.params.edit_id;
        const editedPost = {
            title:req.body.title,
            author:req.body.authorName,
            description:req.body.description
        };
        Post.findByIdAndUpdate(Id,editedPost,(err,post) => {
            if(err){
                console.log(err);
            }else{
                req.flash("success-message","Post Updated");
                res.redirect("/admin/posts");
            }
        })
    },
    deletePost:(req,res) => {
        const deleteId = req.params.delete_id;
        Post.findByIdAndDelete(deleteId).then(post => {
            req.flash("error-message","Post Deleted")
            res.redirect("/admin/posts");
        })
    }
}