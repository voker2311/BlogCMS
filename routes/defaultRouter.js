const express = require('express');
const defaultControllers = require('./../controllers/defaultControllers');
const { route } = require('./adminRouter');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./../models/users');
const bcrypt = require('bcrypt');

router.all("/*",(req,res,next) => {
    req.app.locals.layout = 'default';

    next();
})

//Passport configs
passport.use(new LocalStrategy({
    usernameField:"email",
    passReqToCallback:true
},(req,email,password,done) => {
   User.findOne({email:email}).then(user =>{
       if(!user){
           return done(null,false,req.flash("error-message"),"Something went wrong");
       }

       bcrypt.compare(password,user.password,(err,passwordMatched) => {
           if(err){
               return err;
           }
           if(!passwordMatched){
               return done(null,false,req.flash("error-message","Invalid credentials"));
           }

           return done(null,user,req.flash("success-message","Logged in sucessfully"));
       })
   }) 
}
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


//App routes
router.route("/")
    .get(defaultControllers.index);

router.route("/login")
    .get(defaultControllers.loginGet)
    .post(passport.authenticate('local',{
        successRedirect:'/admin',
        failureRedirect:'/login',
        failureFlash:true,
        successFlash:true,
        session:true
    }),defaultControllers.loginPost);

router.route("/register")
    .get(defaultControllers.registerGet)
    .post(defaultControllers.registerPost);

router.route("/posts/:postId")
    .get(defaultControllers.viewPost);

module.exports = router;