//requried to install the express for making easer and faster
const express = require('express');
//used to create the cookies
const cookieParser = require('cookie-parser');
//port established at 8000
const port = 8080;
//body parser is used to get extarct the data 
const bodyParser = require('body-parser');
//express starts
const app = express();
//expressLayouts are used to create the layout and makes easier for creating different post or content in same design
const expressLayouts = require('express-ejs-layouts');
//checks whether mongodb running or not
const dp = require('./config/mongoose');
//session cookie is used for create the session
const session = require('express-session');
//passport.js is used for authentication makes easy to create the authentication
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');

//statics for creating the css files or javascript files

app.use(express.static('./assets'))



app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());



app.use(expressLayouts);


app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//setting up the views 
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name : 'REVIEW',
    secret : 'something',
    saveUninitialized : false,
    cookie : {
        maxAge : (1000*60*100)
    },
    store : MongoStore.create({
        mongoUrl : 'mongodb+srv://pavannaru56:yeISXySkrESURxpF@cluster0.rpjclhn.mongodb.net/review?retryWrites=true&w=majority'
    })

}));
//passport as a middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//connects the routes folder
app.use('/',require('./routes'));
//port running
app.listen(port,(err)=>{
    if(err){
        console.log('error in port',err);
    }
    console.log("port successfully connected");
});