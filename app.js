require('dotenv').config({path:`${__dirname}/config/.env`})
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000
const DB_NAME = process.env.DB_NAME
const DB_PASS = process.env.DB_PASS

console.log(DB_NAME);
console.log(DB_PASS);

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

async function start() {
    try {
        await mongoose.connect(`mongodb+srv://${DB_NAME}:${DB_PASS}@cluster0.wtkfhno.mongodb.net/todo`, {
            useNewUrlParser: true
        })
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()