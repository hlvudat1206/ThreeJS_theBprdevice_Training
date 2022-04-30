const express = require('express');
const multer  = require('multer');


const storage = multer.diskStorage({        ////chi dan thu muc luu
    destination: function (req, file, cb) {
        cb(null, './uploads'); 
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, 'test-'+file.originalname);        //// save file
    },
});

  
const upload = multer({ storage: storage }).single('myfile');
// const userController = require('../controllers/user.controller');

// router.get('/',userController.get);

const router = express.Router();


// router.post('/', upload.single('myfile'), (req, res, next) => {
//     console.log('test');
//     return res.status(200).json('OK'); ;
router.post('/', (req, res,next) => { //thuc thi
    upload(req, res, function (err) {
      if (err) {
        // A Multer error occurred when uploading.
            res.send(err);
      } else {
            res.send('Success, Image uploaded!');
        // An unknown error occurred when uploading.
      }
  
      // Everything went fine.
    });

});
    


module.exports = router;