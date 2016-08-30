'use strict';

var logger   = require('winston'),
    express  = require('express'),
    config   = require('config.json')('./config.json'),
    mongoose = require('mongoose');

config.logger = logger;

mongoose.connect(config.mongodb);
var db = mongoose.connection;
db.once('open', function() {
    logger.info('Connected to Mongodb on %s', config.mongodb);

    var bot = require('./src/bot')(config);
    var listener = require('./src/listener')(express(), config);
    var manager = require('./src/notificationManager')(config, bot, listener);
});

db.on('error', function() {
    logger.error('Mongodb connection failed!');
});
