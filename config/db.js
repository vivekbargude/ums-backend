<<<<<<< HEAD
const mongoose = require('mongoose');
const colors = require('colors');
const DB_URL = "mongodb://localhost:27017/ums"


const connection = mongoose
.connect(DB_URL)
.then(()=>{
    console.log("Database Connected.".green.bold);
}).catch((e)=>{
    console.log("Connection Failed!!".red.bold);
});

=======
const mongoose = require('mongoose');
const colors = require('colors');
const DB_URL = "mongodb://localhost:27017"


const connection = mongoose
.connect(DB_URL)
.then(()=>{
    console.log("Database Connected.".green.bold);
}).catch((e)=>{
    console.log("Connection Failed!!".red.bold);
});

>>>>>>> 873dc822370762fdb03dbd6887bac6b6b496d1eb
module.exports = connection;