const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {''
        const token = req.header['Authorization'].split(' ')[1];
        console.log('token',token);

        if (!token) return res.status(400).json({msg: ' Chua co JWT '});

        jwt.verify(token, process.env.TOKEN_SECRET , (err, user) => {

            if (err) return res.status(40).json({msg: ' JWT sai '});

            req.user = user;

            next();
        });

    } catch (err) {
        return res.status(500).json({msg: ' Bi loi JWT '});
    }
  
};
module.exports = authenticateToken;