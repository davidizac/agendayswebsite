    
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const env = require('./config');
const mongoose = require('mongoose');
const app = express(); 
const parseArgs = require('minimist')(process.argv.slice(2));
const socketService = require('./api/services/socket.service');

/////////////////////
// configurations //
///////////////////

// enable cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const server = http.createServer(app);

mongoose.connect(env.mongoUri, {useNewUrlParser: true})
.then(() => {
    console.log( `Succesfully Connected to the Mongodb at ${env.mongoUri}`);
})
.catch(err => {
    console.log(`Failed to connect to Mongodb: ${err}`)
})

var io = socketService.init(server);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    req.io = io;
    req.app = app;
    next();
});

app.use(express.static(path.join(__dirname, 'dist')));

/////// routes //////
////////////////////

/* api references */
const authApi = require("./api/routes/auth.routes");
app.use('/api/auth', authApi);





// Send all other requests to the Angular app
app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist','console','index.html'));
});

//Set Port
const port = parseArgs.PORT || '3000';
app.set('port', port);
app.io = io;

server.listen(port, () => {
    console.log(`Running on localhost:${port}`);
})