const express = require('express');
const router = express.Router();
const fs = require('fs')
const dir = './UsersData';
const download = './Downloads'
const encryptor = require('file-encryptor');
const paths = require('path');
const mime = require('mime-types');


module.exports = (req, res, next) => {
  console.log(req.params);
  let hash = req.params.hash;
  let userId = req.params.userId;
  let folder = req.params.folderName;
  let file = req.params.fileName;
  let path = dir + "/" + userId + "/" + folder + "/" + file
  let downloadPath = download+'/'+file;
  encryptor.decryptFile( path , downloadPath, hash, function(err) {
    res.download(downloadPath);
    res.on('finish',function(){
       fs.unlinkSync(downloadPath)
    })
  });
}
