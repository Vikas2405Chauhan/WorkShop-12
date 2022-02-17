const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://vikas:12345@cluster0.ugqpp.mongodb.net/WorkShop-12?retryWrites=true&w=majority');
 
const db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connection Successful!");
});