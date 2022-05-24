const User = require('../models/user.model'); //user la function, ko phai tu dat dau
const people = require('../assets/people.json');
const fs = require('fs');
const filename = 'chao.txt';
const db = require('../database');
const bcrypt = require('bcrypt');

const authenticateToken = require('../middlewares/authenticateToken');

const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require('constants');
const saltRounds = 10;
const jwt = require('jsonwebtoken');



class UserController {
    get(req,res, next) {
        // Website you wish to allow to connect
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

        // // Request methods you wish to allow
        // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // // Request headers you wish to allow
        // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // // Set to true if you need the website to include cookies in the requests sent
        // // to the API (e.g. in case you use sessions)
        // res.setHeader('Access-Control-Allow-Credentials', true);
        db.connectDB()
            .then((connection) => {
                console.log('connected successfully');
                connection.query(
                    'SELECT * FROM login2',
                    function (err, data, fields) {
                        console.log('data',data);
                        db.closeDB(connection);
                        // return res.send(data);
                        return res.status(200).json(data);
                    }
                );
            })
            .catch((error) => {
                console.log('DB not connected successfully',error);
                return res.status(200).json({ result: `Ko the ket noi Db`});
            });
        
    }
    gettopscore(req,res, next) {
       
        db.connectDB()
            .then((connection) => {
                console.log('connected successfully');
                connection.query(
                    'SELECT * FROM result ORDER by score DESC LIMIT 6',
                    function (err, data, fields) {
                        console.log('data',data);
                        db.closeDB(connection);
                        // return res.send(data);
                        return res.status(200).json(data);
                    }
                );
            })
            .catch((error) => {
                console.log('DB not connected successfully',error);
                return res.status(200).json({ result: `Ko the ket noi Db`});
            });
        
    }
    
    post(req,res) {
        const username = req.body.username;
        const password = req.body.password;
        let encryptedPassword = '';

        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, function(err, hash) {
                encryptedPassword = hash;
                console.log('hash', hash);
                db.connectDB()
                    .then((connection) => {
                        console.log('connected successfully');
                        connection.query(
                            // `INSERT INTO login (username,password,passreal) VALUES ('${username}','${encryptedPassword}','${password}')`,
                            `INSERT INTO login2 (username, password, passreal) VALUES ('${username}','${encryptedPassword}','${password}')`,
                            // 'SELECT * FROM login',
                            function (err, data, fields) {
                                console.log('data',data);
                                db.closeDB(connection);
                                return res.status(200).json({ result: `Ket noi thanh cong`});
                            }
                        );
                    })
                    .catch((error) => {
                        console.log('DB not connected successfully',error);
                        return res.status(200).json({ result: `Ko the ket noi Db`});
                    });
            
        // return res.status(200).json({ result: `Dang nhap thanh cong`});
            });
        });
    }
    signup(req,res) {
        const username = req.body.username;
        const password = req.body.pass;
        const image = req.body.image;
        let encryptedPassword = '';

        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, function(err, hash) {
                encryptedPassword = hash;
                console.log('hash', hash);
                db.connectDB()
                    .then((connection) => {
                        console.log('connected successfully');
                        connection.query(
                            // `INSERT INTO login (username,password,passreal) VALUES ('${username}','${encryptedPassword}','${password}')`,
                            `INSERT INTO result (user, pass, imagelink) VALUES ('${username}','${encryptedPassword}','${image}')`,

                            // 'SELECT * FROM login',
                            function (err, data, fields) {
                                console.log('data',data);
                                db.closeDB(connection);
                                return res.status(200).json({ result: `Ket noi thanh cong`});
                            }
                        );
                    })
                    .catch((error) => {
                        console.log('DB not connected successfully',error);
                        return res.status(200).json({ result: `Ko the ket noi Db`});
                    });
            
        // return res.status(200).json({ result: `Dang nhap thanh cong`});
            });
        });
    }
    post2(req,res) {
        let nameBattery = req.body.typebattery;
        // const nameBattery = req.body;
        console.log('in ra nameBattery: ', nameBattery)
        db.connectDB()
            .then((connection) => {
                console.log('connected successfully');
                connection.query(
                    // `INSERT INTO login (username,password,passreal) VALUES ('${username}','${encryptedPassword}','${password}')`,
                    `INSERT INTO pintype (nameBattery) VALUES ('${nameBattery}')`,
                    // 'SELECT * FROM login',
                    function (err, data, fields) {
                        console.log('data',data);
                        db.closeDB(connection);
                        return res.status(200).json({ result: `Ket noi thanh cong`});
                    }
                );
            })
            .catch((error) => {
                console.log('DB not connected successfully',error);
                return res.status(200).json({ result: `Ko the ket noi Db`});
            });
            
     
     
    }
    post3(req,res) {
        const score = req.body.score;
        const username = req.body.username;
        // const nameBattery = req.body;
        console.log('in ra score database: ', score);
        console.log('in ra username database: ', username);
        db.connectDB()
            .then((connection) => {
                console.log('connected successfully');
                connection.query(
                    // `INSERT INTO login (username,password,passreal) VALUES ('${username}','${encryptedPassword}','${password}')`,
                    // `INSERT INTO pintype (nameBattery) VALUES ('${score}')`,
                    `UPDATE result SET score = '${score}' WHERE user = '${username}'`,
                    // 'SELECT * FROM pintype',
                    function (err, data, fields) {
                        console.log('data',data);
                        db.closeDB(connection);
                        return res.status(200).json({ result: `Ket noi thanh cong22`});
                    }
                );
            })
            .catch((error) => {
                console.log('DB not connected successfully',error);
                return res.status(200).json({ result: `Ko the ket noi Db`});
            });
            
     
     
    }
     login(req,res) {
        const username = req.body.username;
        const password = req.body.password;
         db.connectDB()
            .then((connection) => {
                console.log('connected successfully');
                connection.query(
                    `SELECT * FROM login2 where username = '${username}' LIMIT 1`,
                    async function (err, data, fields) {
                        console.log('data',data[0].password);
                        db.closeDB(connection);

                        const kiemtraPwd = await bcrypt.compare(password, data[0].password); 
                            //  function(err, kiemtraPwd) {
                                if (kiemtraPwd) {
                                    return res.status(200).json('log in thanh cong');
                            
                                } else {
                                    return res.status(200).json('log in that bai');
                                } 
                        
                    }
                );
            })
            .catch((error) => {
                console.log('DB not connected successfully',error);
                return res.status(200).json({ result: `Ko the ket noi Db`});
            });
    }

    promise(req,res) {
        let data = 'chua co';
        db.testPromise(1000)
            .then((monan) => {
                data = monan
                console.log('monan',monan);
              //  return res.status(200).json(data);

            })
            .catch((error)=>{
                console.log('error',error);
                return res.status(200).json(error);

            });
        db.testPromise(3000)
            .then((monan) => {
                data = monan
                console.log('monan',monan);
               // return res.status(200).json(data);

            })
            .catch((error)=>{
                console.log('error',error);
                return res.status(200).json(error);

            });    
        console.log('users',data);

        const key = require('crypto').randomBytes(256).toString('hex');
        console.log('secret key',key);

        return res.status(200).json(data);
        
    }
    

    promises(req,res) {
        let data = 'chua co';
        db.testPromise(3000)
            .then((monan) => {
                data = monan
                console.log('monan',monan);
                return res.status(200).json(data);

            })
            .catch((error)=>{
                console.log('error',error);
                return res.status(200).json(error);

            });
        db.testPromise(3000)
            .then((monan) => {
                data = monan
                console.log('monan',monan);
                return res.status(200).json(data);

            })
            .catch((error)=>{
                console.log('error',error);
                return res.status(200).json(error);

            });    
        console.log('users',data);

        const key = require('crypto').randomBytes(256).toString('hex');
        console.log('seret key',key);
        
        return res.status(200).json(data);
        
    }
    async async_await(req,res){
        let allData = 'Chua co Data';
        const promise1 = await db.testPromise('#1',3000).then((data)=>{
            allData = data;
        });
        // const promise1 = db.testPromise('#1',3000);
        // Promise.all([promise1, promise2]).then(
        //     (result) => {
        //         console.log(values); 
        //         return res.status(200).json(result);
        //     },
        //     (error) => {
        //         console.log(error); 
        //         return res.status(200).json(error);
        //     }
        // );
        console.log('allData',allData);
        return res.status(200).json(allData);
    }
    async fakelogin(req,res){
        const payload = {username: 'Vu Dat',id: 1};
        const token = generateJWT(payload);
        return res.status(200).json(token);

    }

    generateSecretKey(req,res) {
                
        const key = require('crypto').randomBytes(256).toString('hex');
        console.log('secret key',key);
    
        return res.status(200).json(key);
        
    }
        


}

function generateJWT(payload) {
    return jwt.sign(payload,process.env.TOKEN_SECRET, { expiresIn: '120s'});
}


module.exports = new UserController();
