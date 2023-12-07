const multer  = require('multer');
/** 
 * 
 * This Function is take file from the front end and save it as image in the public/images folder
 * 
 */
const uploadImage = multer({

    storage: multer.diskStorage({
    destination: function (req, file, callback) {
      console.log('./public/images');
      callback(null,'./public/images/');
    },
    filename: function (req, file, callback) {
      file.originalname = Date.now()+'_'+file.originalname; 
        console.log('../public/images/'+file.originalname );
        callback(null,file.originalname)},
    })

  }).single('file');

module.exports= {uploadImage}
