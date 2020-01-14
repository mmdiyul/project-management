const mongoose = require('mongoose')
const { prodServer, projectName } = require('./env.conf')
const isDevMode = process.env.NODE_ENV ==='development'
const url = isDevMode? `mongodb://${prodServer}:27017`: `mongodb://${prodServer}:27017`
const debug = require('debug')(`${projectName}:mongoose`)
const { red, green, magenta } = require('chalk')
let retry = 0;
const db = mongoose.connection
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    autoIndex: false, // Don't build indexes
    poolSize: 9, // Maintain up to 10 socket connections
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity,
    useUnifiedTopology: true ,
    dbName: isDevMode? 'project-management' : 'project-management',
    user: isDevMode? 'mmdiyul' : 'mmdiyul',
    pass: isDevMode? 'tahun2014' : 'tahun2014',
    auth: {
        authdb: 'admin'
    }
}
exports.url = url
exports.connect = ()=>{
    mongoose.connect(url, options, onMongoError);
}
db.once('open',()=> debug(green('database connected!')))

function onMongoError(err){
    if(err) {
        const { name, errorLabels } = err;
        debug(`${red(name)}: ${errorLabels}`)
        if(retry<3) {
            retry+=1
            debug(`DB connection retrying: ${retry} attempt`)
            setTimeout(()=>{
                exports.connect()
            }, 3000)
        }
        if(retry==3) {
            console.log(magenta('Mongoose connection is disconnected due to failed to connect 3 times'));
            mongoose.disconnect()
            process.exit(1)
        }
    } else {
        retry = 0
    }
}

exports.connection = mongoose.connection
exports.Schema = mongoose.Schema
exports.model = mongoose.model
