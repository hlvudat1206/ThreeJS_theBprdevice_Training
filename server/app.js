const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5001;
const apiPath = '/api/';
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.json());
app.use(express.urlencoded());
    // const urlencodedParser = bodyParser.urlencoded({ extended: false })

// website
app.use(express.static('client'));
// app.get('/client', express.static('client'));
// app.get('/', function (req, res) {
//    res.sendFile( __dirname + "/" + "index.html" );
// })


// routers
app.use(apiPath + 'users', require('./routers/users.route'));
app.use(apiPath + 'upload', require('./routers/upload.route'));
// app.use(apiPath + '/users/login', require('./routers/users.route'));


// app.get('/', function (req, res) {
//    res.send('Hello World');
// });
// app.get('/test', function (req, res) {
//     res.send('Bạn đang trong trang test');
// });
// app.get('/users', function (req, res) { //web api
//     res.send({name: 'Dat',address: 'USA'});
// });

app.listen(port, function () {
    const host = 'localhost';               // server.address().address
    // const port = server.address().port
   
    console.log("Example app listening at http://%s:%s", host, port)
});

module.exports = app;