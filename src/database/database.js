import { App } from '../app.js';
/* const { user, password, database} = require('./databaseKeys.js'); */
import { db } from './databaseKeys.js';
/* var mongoose = require('mongoose'); */
import { mongoose } from 'mongoose';

var port = '3700';

export const database = {
  connect: () => {
    const { user, password, database } = db;
    
    const uri = `mongodb+srv://${user}:${password}@cluster0.gxn1g.mongodb.net/${database}?retryWrites=true&w=majority`;  
    
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 2000
    })
    .then(() => {
      console.log('Database is connected');
      App.listen(port, console.log(`Sever running on: http:localhost:${port}/api`)
      )
    })
    .catch(err => console.log("error: " + err));
  }
}
