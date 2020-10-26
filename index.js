const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const handleBars = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const {mongoURL, PORT, globalVariables} = require("./config/config");

//Mongoose config
mongoose.connect(mongoURL, { useNewUrlParser: true })
   .then( response => {
      console.log("MongoDB Connected"); 
   }).catch(err => {
       console.log("Connection failed");
   });


//Middlewares config
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(fileUpload());
// Session goes here
app.use(session({
    secret:"dotaislove",
    saveUninitialized:true,
    resave:true
}));

app.use(flash());
app.use(globalVariables);
//View engine stuff
app.engine('handlebars',handleBars({defaultLayout:'default'}));
app.set('view engine','handlebars');


// Routes
const defaultRoutes = require('./routes/defaultRouter');
const adminRoutes = require('./routes/adminRouter');
app.use("/",defaultRoutes);
app.use("/admin",adminRoutes);


//App Listens
app.listen(PORT, () => {
    console.log(`Server started at port:${PORT}`);
})