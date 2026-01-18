// DEPENDENCIES
const fs = require('fs')
const path = require('path')

// CONSTANTS
// const MOVIE_DIRECTORY = "C:\\Users\\Administrator\\Videos"
const MOVIE_DIRECTORY = "movies"
const VALID_EXTENSIONS = [
    ".mkv",
    ".mp4",
    ".avi",
    ".avi",
    ".mov",
    ".wmv",
    ".flv",
    ".flv",
]

/**
 * Read files in directory and return list of paths with valid file extension
 * @returns A set of objects containing movie file names and file paths to locate them.
 * @example { fileName: "movie.mkv", directory: "./movies/movie.mkv" }
 */
async function getAllMoviePaths() {
    let validFiles = new Set()
    fs.readdirSync(path.join(__dirname, 'public', MOVIE_DIRECTORY))
        .filter((f) => VALID_EXTENSIONS.includes(path.extname(f)))
        .forEach((f) => validFiles.add({ fileName: f, directory: `./${MOVIE_DIRECTORY}/${f}`}))
    
    return validFiles
}

module.exports = {
    getAllMoviePaths,
}