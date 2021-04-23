const express = require('express')
const exLoader = require('./loaders/express')
const loader = require('./loaders/init')
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const PORT = process.env.PORT;

loader({
    expressApp: app
})
.then( () =>{
    app.listen(PORT,()=> console.log(`Server Starting Port ${PORT}`))
})
.catch( (err) =>{
    console.log(`Loader Failed err: ${err}`)
});




