require('dotenv').config({ quiet: true })
const path = require('path')
const PORT = process.env.PORT || '3000'
const express = require('express')
const app = express()
const { getAllMoviePaths } = require('./utils')
const appConfig = require('./config')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middleware
app.use(express.json())
app.use(express.static('public'))

// Global Var
let movieFilesSet = undefined
let topLevelSubfolders = undefined

// GET /
app.get('/', async (req, res) => {
    // console.log('PINGED')
    // get movie name from query string
    let selectedMovie = req.query.selected || undefined

    // only re-populate movie list if it's empty / undefined
    if (!movieFilesSet)
        [movieFilesSet, topLevelSubfolders] = await getAllMoviePaths()

    // if there's a selected movie from the query string, find it from the set
    if (!!selectedMovie)
        selectedMovie = [...movieFilesSet]
            .find(m => m.fileName == selectedMovie)

    res.status(200).render('index', { movieFilesSet, topLevelSubfolders, selectedMovie })
})

// POST /reload - reload the list of movies
app.post('/reload', async (req, res) => {
    [movieFilesSet, topLevelSubfolders] = await getAllMoviePaths()
    res.redirect('/') // reload the home page
})

// 404 Not Found
app.use(function (req, res) {
    res.render('notFound', { url: req.url})
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
    // check appConfig for QRCode in terminal
    if (appConfig.printTerminalQR)
        require('./terminalQR')()
})