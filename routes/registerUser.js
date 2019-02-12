const express = require('express');
const router = express.Router();
const createUser= require('../models/register');
const randomID = require('random-id');
const dir = './UsersData';
const mkdirp = require('mkdirp');
module.exports = (req, res, next) => {
  console.log("innn");
  console.log(req.body);
  let id = randomID(10, "0");
  let newUser = new createUser({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    phone : req.body.phone,
    userId : id,
    data : "{}",
    fileKeys : "{}"
  });

  newUser.save(function(err) {
    if (err) throw err;

    let path = dir + '/' +id;

    // if (!fs.existsSync(path)){
      mkdirp(path, function (err) {
        console.log("yo");
          if (err) console.error(err)
          console.log('User saved successfully');
          res.json({ success: true });
      });
    // }
  });
}
