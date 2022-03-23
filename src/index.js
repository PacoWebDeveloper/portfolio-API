'use strict'
import { database } from './database/database.js';
/* var app = require('./app'); */
import { App } from './app.js'

var port = process.env.PORT || 3700;

App.listen(port, () => {
    database.connect()
    console.log(`Server running in url: http://localhost:${port}`)
})