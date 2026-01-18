require('dotenv').config({ quiet: true })
const path = require('path')
const PORT = process.env.PORT || '3000'
const express = require('express')
const app = express()
const { getAllMoviePaths } = require('./utils')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middleware
app.use(express.json())
app.use(express.static('public'))

// Global Var
let movieFilesSet = new Set()

// GET /
app.get('/', async (req, res) => {
    // get movie name from query string
    let selectedMovie = req.query.selected || undefined

    // only re-populate movie list if it's empty
    if (movieFilesSet.size == 0)
        movieFilesSet = await getAllMoviePaths()

    // if there's a selected movie from the query string, find it from the set
    if (!!selectedMovie)
        selectedMovie = [...movieFilesSet]
            .find(m => m.fileName == selectedMovie)

    res.status(200).render('index', { movieFilesSet, selectedMovie })
})

// 404 Not Found
app.use(function (req, res) {
    res.render('notFound', {})
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})