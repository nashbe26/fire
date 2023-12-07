const multer  = require('multer');
/** 
 * 
 * This Function is take file from the front end and save it as image in the public/images folder
 * 
 */
const uploadPDF = multer({

    storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null,'./public/images');
      },
      filename: function (req, file, callback) {
        file.originalname = Date.now()+'_'+file.originalname.replaceAll(' ', '_'); 
        callback(null,file.originalname)},
    },
    
    ),
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'application/pdf' || file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      }

  }).single('file');

module.exports= {uploadPDF}
