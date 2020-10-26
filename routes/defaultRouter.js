const express = require('express');
const defaultControllers = require('./../controllers/defaultControllers');
const { route } = require('./adminRouter');
const router = express.Router();

router.all("/*",(req,res,next) => {
    req.app.locals.layout = 'default';

    next();
})

//App routes
router.route("/")
    .get(defaultControllers.index);

router.route("/login")
    .get(defaultControllers.loginGet)
    .post(defaultControllers.loginPost);

router.route("/register")
    .get(defaultControllers.registerGet)
    .post(defaultControllers.registerPost);

router.route("/posts/:postId")
    .get(defaultControllers.viewPost);

module.exports = router;