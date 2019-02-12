const express = require('express');
const router = express.Router();
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')
const fs = require('fs')
const User = require('../models/register');
const dir = './UsersData';

module.exports = (req, res, next) => {
  let userId = req.params.userId;
// let path = dir +'/'+ req.params.userId
// let folders = getDirectories(path)
  // res.json({
  //   success : true,
  //   folders : folders
  // })
  User.findOne({
    userId: userId
  }, function(err, user) {
    console.log(user);
    if (err) {
      res.json({success : false});
    }
    console.log(user.data);
    let folders = []
    let data = JSON.parse(user.data)
    for(var i in data){
      folders.push(i)
    }
    console.log(folders);
    res.json({success : true,
      folders : folders
    })
  });
// function getDirectories(path) {
//   return fs.readdirSync(path).filter(function (file) {
//     return fs.statSync(path+'/'+file).isDirectory();
//   });
// }
}
