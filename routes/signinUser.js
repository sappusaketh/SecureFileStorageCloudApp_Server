const express = require('express');
const router = express.Router();
const User = require('../models/register');
const jwt    = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    User.findOne({
      email: userEmail
    }, function(err, user) {
      if (err) throw err;
      console.log(user);
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
        console.log(user.password);
        // check if password matches
        if (user.password == userPassword) {
          const payload = {
            admin: user.name
          };
          var token = jwt.sign(payload, config.secret, {
            expiresIn: 1440 // expires in 24 hours
          });
          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            userId : user.userId,
            email: user.email
          });
        } else {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        }

      }

    });
}
