const express = require('express')
const app = express()
const config = require('./config');
const mongoose = require('mongoose');
const registerUser = require('./routes/registerUser');
const signinUser = require('./routes/signinUser');
const createFolder = require('./routes/createFolder');
const getFolderNames = require('./routes/getFolderNames');
const uploadFile = require('./routes/uploadFile');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const loadFiles = require('./routes/loadFiles');
const downloadFile = require('./routes/downloadFile');
const deleteFile = require('./routes/deleteFile')
const forgotPassword = require('./routes/forgotPassword')
const checkHash = require('./routes/checkHash')
const deleteFolder = require('./routes/deleteFolder')

mongoose.connect(config.database)
  .then(() => console.log('connected to mongoose'))
  .catch((err) => console.error('error connecting to mongo', err));



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cookieParser());


app.get('/', (req, res) =>{
  res.send('Hello World!')
});

app.post('/registerUser', registerUser);
app.post('/signinUser', signinUser);
app.get('/createFolder/:userId/:folderName', createFolder);
app.get('/getFolderNames/:userId', getFolderNames);
app.post('/uploadFile/:userId/:folderName/:hash', uploadFile);
app.get('/loadFiles/:userId/:folderName', loadFiles);
app.get('/forgotPassword/:userId/:fileName', forgotPassword);
app.get('/checkHash/:userId/:folderName/:fileName/:hash', checkHash);
app.get('/deleteFolder/:userId/:folderName', deleteFolder);

app.get('/downloadFile/:userId/:folderName/:fileName/:hash', downloadFile);
app.get('/deleteFile/:userId/:folderName/:fileName', deleteFile);

app.listen(3001, () => console.log('Example app listening on port 3001!'))
