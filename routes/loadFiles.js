const express = require('express');
const router = express.Router();
const fs = require('fs')
const dir = './UsersData';
const User = require('../models/register');


module.exports = (req, res, next) => {
  let userId = req.params.userId;
  let folder = req.params.folderName;
  let path = dir +'/'+ userId +'/'+ folder;
  console.log(path);
  let filesArray = []
  User.findOne({
    userId: userId
  }, function(err, user) {
    console.log(user);
    if (err) {
      res.json({success : false});
    }
    console.log(user.data);
    let data = JSON.parse(user.data)
    res.json({success : true,
      files : data[folder]
    })
  });
}
