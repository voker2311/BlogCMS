const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminControllers');
const { route } = require('./defaultRouter');

router.all("/*",(req,res,next) => {
    req.app.locals.layout = 'admin';

    next();
});

router.route("/")
    .get(adminControllers.index);

router.route('/posts')
    .get(adminControllers.posts)



router.route('/compose')
    .get(adminControllers.compose)
    .post(adminControllers.composePost);

router.route('/edit/:edit_id')
    .get(adminControllers.editPost)
    .post(adminControllers.updatePost)

router.route('/delete/:delete_id')
    .get(adminControllers.deletePost);


module.exports = router;