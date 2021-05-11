//require the library
const mongoose=require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');

//acquire the connection(to check it is suceesful or not)
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));


//up and running then print the message
db.once('open',function(){
    console.log('Succesfully connected to database');
});