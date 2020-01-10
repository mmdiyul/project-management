const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const db = require('./configs/database.conf').URL
const port = process.env.PORT || 3300
// const database = require('./configs/database.conf')
const app = express()
const rolesRoute = require('./routes/api/roles/roles.route')

// database.connect

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/json' }))

app.use('/roles', rolesRoute)
app.get('/', (req, res) => {
    res.send('It Works!')
})

app.listen(port, () => {
    console.log(`Server started on ` + port)
})