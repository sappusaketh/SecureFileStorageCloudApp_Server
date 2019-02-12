const express = require('express');
const router = express.Router();
const createUser= require('../models/register');
const randomID = require('random-id');
const fs = require('fs');
const dir = './UsersData';
const mkdirp = require('mkdirp');
const encryptor = require('file-encryptor');
const User = require('../models/register');


module.exports = (req, res, next) => {
  let path = dir + '/' +req.params.userId;
  console.log(path);

  if (fs.existsSync(path)){
    let id = req.params.userId;
    let folderName = req.params.folderName;
    let newPath = path +'/'+ folderName
    let dirPath = newPath;
    try { var files = fs.readdirSync(dirPath); }
    catch(e) { return; }
    if (files.length > 0)
      for (var i = 0; i < files.length; i++) {
        var filePath = dirPath + '/' + files[i];
        if (fs.statSync(filePath).isFile())
          fs.unlinkSync(filePath);
        else
          rmDir(filePath);
      }
    fs.rmdirSync(dirPath);

        // if (err) console.error(err)
        User.findOne({
          userId: id
        }, function(err, user) {
          console.log(user.data);
          let data = JSON.parse(user.data)
          delete data[folderName];
          user.data = JSON.stringify(data);
          console.log(user.data );
          user.save(function (err) {
            if (err) {
              res.json({success : false})
            }
            res.json({success : true})
          });

        });

  }
}
