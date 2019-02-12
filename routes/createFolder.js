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
    mkdirp(newPath, function (err) {
      console.log(id);
        if (err) console.error(err)
        if(fs.existsSync(newPath)){
          User.findOne({
            userId: id
          }, function(err, user) {
            console.log(user.data);
            let data = JSON.parse(user.data)
            data[folderName] = [];
            user.data = JSON.stringify(data);
            user.save(function (err) {
              if (err) {
                res.json({success : false})
              }
              res.json({success : true})
            });

          });
        }else{
          res.json({success : false})
        }
    });
  }
}
