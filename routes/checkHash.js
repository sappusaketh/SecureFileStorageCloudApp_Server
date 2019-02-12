const express = require('express');
const router = express.Router();
const fs = require('fs')
const dir = './UsersData';
const download = './Downloads'
const encryptor = require('file-encryptor');
const key = 'Santhu bro oopu, dham unte aapu !!';
const paths = require('path');
const mime = require('mime-types');
const User = require('../models/register');


module.exports = (req, res, next) => {
  let hash = req.params.hash;
  let userId = req.params.userId;
  let folder = req.params.folderName;
  let file = req.params.fileName;
  let path = dir + "/" + userId + "/" + folder + "/" + file
  let downloadPath = download+'/'+file;


  User.findOne({
    userId: userId
  }, function(err, user) {
    if (err) {
      res.json({success : false});
    }
    let fileKeys = JSON.parse(user.fileKeys)
    console.log(fileKeys[file]);
    if (fileKeys[file] == hash) {
      res.json({"valid" : true })
    }else {
      res.json({"valid" : false })
    }
  });
}
