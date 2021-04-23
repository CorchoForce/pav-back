const express = require('express')
const router = express.Router();

router.get('/', (req,res)=>{
    res.send("<h1>HELLLO 2</h1>")
})


module.exports = {url:'/',router}