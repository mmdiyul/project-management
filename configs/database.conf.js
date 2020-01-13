// const mongoose = require('mongoose')
// const tunnel = require('tunnel-ssh')
// const fs = require('fs')

// const config = {
//   agent: process.env.SSH_AUTH_SOCK,
//   username: 'ubuntu',
//   privateKey: fs.readFileSync(__dirname + '/sentipro.pem'),
//   host: '18.136.210.195', //IP adress of VPS which is the SSH server
//   port: 22,
//   dstHost: 'localhost',
//   dstPort: 27017, //or 27017 or something like that
//   keepAlive: true
// };

// exports.connectDatabase = () => {
//   tunnel(config, (error, server) => {
//     if(error) {
//         console.log("SSH connection error: ", error);
//     }

//     mongoose.connect('mongodb://root:root@localhost:27017/?authSource=admin&readPreference=primary&ssl=false/project-management', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, ssl: true })
//       .then(console.log('Connection successful!'))
//       .catch(err => console.log(err))

//     // exports.connect = () => {
//     //   mongoose
//     //     .connect('mongodb://root:root@127.0.0.1:27017/project-management', { ssl: true })
//     //     .then(() => console.log('Mongodb connected'))
//     // }
//   })
// }

module.exports = {
  URL: "mongodb://mmdiyul:tahun2014@localhost:27017/project-management?authSource=admin&readPreference=primary&ssl=false"
}