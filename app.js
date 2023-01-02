if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

var createError=require('http-errors');
let express = require('express');
let app = express();
const expressLayouts = require('express-ejs-layouts');
let session =require('express-session');
let path = require('path');
let database = require('./config/dbConfig');
let cookieParser = require('cookie-parser');
const { url } = require('inspector');
const indexRouter = require('./routes/index');
const mongoose = require ('mongoose')
var db = mongoose.connection;
//server cache clearing... 
app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

next();
});

app.set('view engine','ejs');
app.set('views', __dirname+'/app/views');
app.set('layout','layouts/layout');
mongoose.set('strictQuery', true);

app.use(expressLayouts);

app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})

db.on('error',error=> console.error(error));
db.once('open',()=> console.log('Connected to Mongoose'));


app.use('/',indexRouter)



let PORT=(process.env.PORT || 8081);
app.listen(PORT,()=>console.log(`Server is running on http://localhost:${PORT}`));
