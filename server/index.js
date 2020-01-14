const cors = require('cors')
const cookieParser = require('cookie-parser');
const db = require('./configs/db.conf')
const { isDevMode, projectName, fname } = require('./routes/helpers')
const express = require('express');
const logger = require('morgan');
const path = require('path');
const compression = require('compression')
const { magenta } = require('chalk')
const { contains } = require('underscore')

const debug = require('debug')(`${projectName}:${fname(__filename)}`)

const app = express();

const session = require('express-session');
const MongoStore =  require('connect-mongo')(session)
const staticFile = 'public'
const passport = require('./routes/auth/passport')

db.connect()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret:'Snuehwfiewuf84394893hyfnjds',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 6},
    store: new MongoStore({mongooseConnection: db.connection})
}))
app.use(compression())
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
app.use(require('./routes'));
app.use(express.static(path.join(__dirname, staticFile )));

// catch static route
app.all('/*',(req, res, next)=>{
    // redirect non-API routes to Angular route
    // res.sendFile('index.html', {root: staticFile })
    res.send("It works!")
})

// error handler
app.use((err, req, res, next)=>{
    const MongoErrName = ['MongoError', 'ValidationError','CastError']
    let { status, name, message } = err
    if(isDevMode) console.error(err);
    if(contains(MongoErrName, name)){
        status = 500
        message = 'Internal Server Error'
    }
    debug(`${magenta(status || 500)} : ${message}`)
    res.status(status || 500).json({message});
});
module.exports = app;
