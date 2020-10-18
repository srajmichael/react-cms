require('dotenv').config();
// require('./utils/database');

const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const MongoStore = require('connect-mongo')(session);

//MONGOOSE CONNECTION
const connection = require('./utils/database');

//APP CREATION
const app = express();

//SESSION STORE
const sessionStore = new MongoStore({
   mongooseConnection: connection,
   collection: 'sessions'
})

//MODELS
const User = require('./models/User');
const Post = require('./models/Post');

app.set('view engine', 'ejs');
app.set('views', 'views');


//MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//SESSION MIDDLEWARE
app.use(session({
   secret: process.env.SESSION_SECRET,
   saveUninitialized: true,
   resave: false,
   store: sessionStore,
   cookie: {
      httpOnly: true,
      maxAge: parseInt(process.env.SESSION_MAX_AGE)
   }
}));


app.get('/',(req,res)=>{
   console.log('has user', req.session.user)
   const frontendPath = path.join(__dirname, 'client', 'public', 'index.html');
   res.send(frontendPath);
   // res.render('front-page');
})


app.post('/validate-user', async (req,res)=>{
   const email = req.body.email;
   const password = req.body.password;
   const errors = [];

   await User.findOne({ email: email }).exec()
   .then(user=>{
      if(!user){
         errors.push('email');
      }
      const hashedPassword = user.password;
      bcrypt.compare(password, hashedPassword, (err, results)=>{
         if(err){
            console.log(err)
            res.redirect('/login')
         }else{
            req.session.user = user;
            console.log(results, 'worked')
            res.redirect('/login')
         }
      })
      
   })
   .catch(err=>{
      console.log(err)
      res.redirect('/login')
   })
})



app.get('/register', (req,res)=>{
   res.render('register');
})

app.post('/register', (req, res)=>{
   const pw = req.body.password;
   const cPw = req.body.confirm_password;
   const firstName = req.body.first_name;
   const lastName = req.body.last_name;
   const email = req.body.email;

   if(pw && cPw && pw === cPw){
      const saltRounds = 10;
      bcrypt.hash(pw, saltRounds, (err,hash)=>{
         const userData = {
            firstName,
            lastName,
            email,
            password: hash
         }
         const newUser = new User(userData);
         newUser.save((err)=>{
            if(err){
               res.send('Failed Registration')
            }else{
               res.redirect('/login?register=true')
            }
         })
      })
   }else{
      res.send('Failed Registration')
   }
})

app.get('/login', (req,res)=>{
   console.log(req.session, 'login user?')
   if(req.session && req.session.user){
      res.redirect('/')
   }else{
      res.render('admin/login')
   }
   
})

app.post('/login', async (req,res)=>{
   const email = req.body.email;
   const password = req.body.password;
   const errors = [];

   await User.findOne({ email: email }).exec()
   .then(user=>{
      if(!user){
         errors.push('email');
         const url = '/login?error=' + errors.join(',');
         res.redirect(url);
      }
      const hashedPassword = user.password;
      bcrypt.compare(password, hashedPassword, (err, results)=>{
         if(err){
            console.log(err)
            res.redirect('/login')
         }else{
            req.session.user = user;
            console.log(results, 'worked')
            res.redirect('/login')
         }
      })
      
   })
   .catch(err=>{
      console.log(err)
      res.redirect('/login')
   })

   
})


app.get('/post', (req,res)=>{

})


app.get('/adminonly', (req,res)=>{
   if(res.session && req.user){
      res.send('MADE IT TO ADMIN')
   }else{
      res.redirect('/login')
   }
})

const port = process.env.DEV_SERVER_PORT;

app.listen(port)