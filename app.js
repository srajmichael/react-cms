require('dotenv').config();
// require('./utils/database');

const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const MongoStore = require('connect-mongo')(session);

const { passwordValidationInformation } = require('./utils/validators');

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
const e = require('express');

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

app.get('/ball', (req,res)=>{
   res.type('.js');
   res.send("console.log('worked from node')")
})




app.get('/check-user-session', (req,res)=>{
   const userData = req.session.user || {}
   res.json({user: userData})
})

app.post('/validate-user', async (req,res)=>{
   const email = req.body.email;
   const password = req.body.password;
   const errors = [];
   await User.findOne({ email: email }).exec()
   .then(user=>{
      //if email isn't found in the database
      if(!user){
         errors.push('No user found with that email.');
         res.json({validUser: false, errors: errors})
      //if email found, validate password
      }else{
         const hashedPassword = user.password;
         bcrypt.compare(password, hashedPassword, (err, results)=>{
            if(err){
               errors.push('Unknown Error Has Occured.');
               res.json({validUser: false, errors: errors})
            }else if(!results){
               errors.push('Incorrect Password.');
               res.json({validUser: false, errors: errors})
            }else{
               const nonAuthUserData = {
                  _id: user._id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email
               }
               req.session.user = nonAuthUserData;
               res.json({validUser: nonAuthUserData, errors: null})
            }
         })
      }  
   })
   .catch(err=>{
      console.log(err)
      res.redirect('/login')
   })
})


app.post('/register-user', async (req, res)=>{
   const { email, password, confirmationPassword, firstName, lastName } = req.body;
   const jsonResponse = { errors:[], submittedSuccessfully: false, visited:[] };

   //PASWORD VALIDATION
   const passwordValidationInfo = passwordValidationInformation(password, confirmationPassword, true);
   
   if(!passwordValidationInfo.valid){
      for(let err of passwordValidationInfo.errors){
         jsonResponse.errors.push(err)
      }
   }

   const foundUser = await User.findOne({ email: email }).exec();

   if(!foundUser && passwordValidationInfo.valid){
      const saltRounds = 10;

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const userData = {
         firstName,
         lastName,
         email,
         password: hashedPassword
      };

      const newUser = new User(userData);

      const savedUser = await newUser.save();

      console.log(savedUser, 'saved user')

   }else{
      jsonResponse.errors.push('Email Already Exists');
   }

   res.json(jsonResponse)
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


app.get('/test', (req, res)=>{
   res.json({we:'didit'})
})

app.get('/',(req,res)=>{
   const frontendPath = path.join(__dirname, 'client', 'public', 'index.html');
   res.sendFile(frontendPath);
   // res.render('front-page');
})

const port = process.env.DEV_SERVER_PORT;

app.listen(port)




