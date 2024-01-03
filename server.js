//dependencias
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const jwtDecode = require("jwt-decode");


//body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cookie-parser
// app.use(cookieParser());

//static web server
app.use(express.static(path.join(__dirname,'dist')));

// function checkAuth(req, res, next) {

//     const token = localStorage.getItem("token");
//     if (token) {
//       next();
//     } else {
//       res.status(401).send('Unauthorized');
//     }
//   }


//route
app.use('/api/read', require('./routes/read.js'));
app.use('/api/create', require('./routes/create.js'));
app.use('/api/update', require('./routes/update.js'));
app.use('/api/delete', require('./routes/delete.js'));
app.use('/api', require('./routes/login.js'));

app.get('*',(request, response)=>{
    response.sendFile(path.join(
        __dirname,'dist/DECE.html'));
});


app.listen(3000, ()=>{
    console.log('Funcionando en localhost:3000');
});

module.exports = app;
