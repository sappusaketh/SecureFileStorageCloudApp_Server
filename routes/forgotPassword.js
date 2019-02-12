const express = require('express');
const router = express.Router();
const fs = require('fs')
const dir = './UsersData';
const User = require('../models/register');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ganapathy567@gmail.com',
    pass: '4197anapati'
  }
});

module.exports = (req, res, next) => {
  let userId = req.params.userId;
  let file = req.params.fileName
  // console.log(userId,file);
  User.findOne({
    userId: userId
  }, function(err, user) {
    if (err) {
      res.json({success : false});
    }

    let filKeys = JSON.parse(user.fileKeys)
    console.log(filKeys[file]);
    let mailOptions = {
      from: 'ganapathy567@gmail.com',
      to: user.email,
      subject: 'Your Key for '+ file,
      text: 'Decryption key is '+ filKeys[file]
    };
    //
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.json({"success" : false})
        console.log(error);

      } else {
        res.json({"success" : true})

        console.log('Email sent: ' + info.response);
      }
    });

  });

}
