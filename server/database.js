const mysql = require('mysql');

require('dotenv').config();

module.exports.connectDB = () => {
    return new Promise((resolve, reject)=>{
        const con = mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'myUserName',
            password: process.env.DB_PASS || 'mypassword',
            database: process.env.DB_NAME || 'mydb'
      
            // host: 'localhost',
            // user: 'root',
            // password: '123456',
            // database: 'qlsvlab'

        });
        con.connect((err)=> {
            if (err) {
                reject(err);
            }
            resolve(con);
        });
    });
};
module.exports.closeDB = (con) => {
    console.log('close db');
    con.destroy();
};


module.exports.testPromise = (name='', ms = 0) => {
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            resolve('Loi hua '+name +'sau khi tam dung'+ ms + 'ms, da lam xong');
        },ms);
        
    });
};