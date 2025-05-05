const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();     

const uploadNews = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        cb(null, true);
      } else {
        cb(new Error('Only images are allowed'));
      }
    }
  });
  
  module.exports = uploadNews;                                    