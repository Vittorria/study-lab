#!/usr/bin/env node
var fs = require('fs');
// Load config
var env = require('../configs/env');
env &&
console.log("bin/www.js/conf loaded");


/**
 * Module dependencies.
 */
// var dotenv = require('dotenv').config({path: __dirname + '/../.env'});
// require('dotenv').config();
// console.log('log -------------:', __dirname, process.env.HOST);

var app = require('../app');
var debug = require('debug')('nodejs-backend:server');
var http = require('http');
var https = require('https');

if (env.SSL_ONLY) {
    // /etc/nginx/ssl/server.key
    var privateKey = fs.readFileSync(env.SSL_KEY, 'utf8');
// /etc/nginx/ssl/server.crt
    var certificate = fs.readFileSync(env.SSL_CRT, 'utf8');


    var credentials = {
        key: privateKey,
        cert: certificate
    };

// your express configuration here

    var httpsServer = https.createServer(credentials, app);

    var sslPort = normalizePort(env.SSL_PORT || '3333');

    httpsServer.listen(sslPort, env.HOST, function () {
        console.log('HTTPS Express server listening on: ' + httpsServer.address().address + ':' + httpsServer.address().port);
    });

    // set server default timeout to 10min
    httpsServer.setTimeout(600000);

    httpsServer.on('error', onError);
    httpsServer.on('listening', onListeningSSL);
}

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(env.PORT || '3333');

app.set('port', port);

var server = http.createServer(app);

server.listen(port, env.HOST, function () {
    console.log('Express server listening on: ' + server.address().address + ':' + server.address().port);
});

// set server default timeout to 10min
server.setTimeout(600000);

server.on('error', onError);
server.on('listening', onListening);
server.on('timeout', (e) => {
    // e - > Socket
    console.log("Timeout event:", server.timeout);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

function onListeningSSL() {
    var addr = httpsServer.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening HTTPS on ' + bind);
}
