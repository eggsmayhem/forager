// WebExtensions that wish to use the Geolocation object must add the "geolocation" permission to their manifest. 

//server tut test

const express = require('express')
const app = express()
const connectDB = require('./config/database')
// const homeRoutes = require('./routes/home')
// const todoRoutes = require('./routes/todos')
// const userLocationRoutes = require('./routes/userlocation')
const homeRoutes = require('./routes/home')

require('dotenv').config({path: './config/.env'})

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


// app.use('/userLocation', userLocationRoutes)
app.use(express.json())

app.use('/', homeRoutes)

app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    