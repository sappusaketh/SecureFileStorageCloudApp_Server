var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ganapathy567@gmail.com',
    pass: '4197anapati'
  }
});

var mailOptions = {
  from: 'ganapathy567@gmail.com',
  to: 'pavansai.n@gmail.com',
  subject: 'Your Key for ',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
