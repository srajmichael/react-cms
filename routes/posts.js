const express = require('express');

const postsRouter = express.Router();

postsRouter.get('/', (req,res)=>{
   res.send('Hey there')
})

postsRouter.get('/:permalink', (req,res)=>{
   res.send('Hey there')
})

module.exports = postsRouter;