const express = require('express');
const router = express.Router();
const multer = require('multer');
const url = require('url');
const encryptor = require('file-encryptor');
const fs = require('fs');
const User = require('../models/register');

var fileTitle ;
var uploadFilePath = './uploads/' + fileTitle;

// multer middleware setup
let storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'uploads/')
  },
  filename: function(req, file, callback) {
    fileTitle =file.originalname;
    uploadFilePath = './uploads/' + fileTitle;
    callback(null, file.originalname)
  }
});

// accepts a single file
const upload = multer({ storage: storage }).single('file');

module.exports = (req, res, next) => {
  let hash = req.params.hash;
  let userId = req.params.userId;
  let folder = req.params.folderName;
  function uploadFile() {
    let uploadFilePromise = new Promise((resolve, reject) => {
      upload(req, res, function(err) {
        if (err) {
            return reject(err);
          } else {
            resolve(req);
          }
      });
    });
    return uploadFilePromise;
  }

  function encrypyFile() {
    console.log("hash is "+hash);
    encryptor.encryptFile(uploadFilePath, './UsersData/'+userId+'/'+folder+'/'+fileTitle, hash, function(err) {
      // Encryption complete.
      if (err) {
         console.log("err");
         res.json({success : false})
        }
        User.findOne({
          userId: userId
        }, function(err, user) {
          console.log(user.data);
          let data = JSON.parse(user.data)
          data[folder].push(fileTitle);
          user.data = JSON.stringify(data);

          let keysArr = JSON.parse(user.fileKeys);
          keysArr[fileTitle] = hash
          user.fileKeys = JSON.stringify(keysArr);

          user.save(function (err) {
            if (err) {
              res.json({success : false})
            }
            fs.unlinkSync(uploadFilePath);
            res.json({success : true})
          });
        });

    });
  }

  uploadFile()
    .then(encrypyFile)
    .catch((err) => {
      return next(err);
    });

}
