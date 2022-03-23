/* const { user, password, database} = require('./databaseKeys.js'); */
import { db } from './databaseKeys.js';
/* var mongoose = require('mongoose'); */
import { mongoose } from 'mongoose';

export const database = {
  connect: () => {
    const { user, password, database } = db;
    
    const uri = `mongodb+srv://${user}:${password}@cluster0.gxn1g.mongodb.net/${database}?retryWrites=true&w=majority`;  
    
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(console.log('Database is connected'))
    .catch(err => console.log("error: " + err));
  }
}
