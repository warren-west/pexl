const qrcode = require('qrcode')
const getLocalIp = require('./network')

/**
 * Generate a QR Code for the terminal containing the URL of the listening server.
 * @param {Number} port Port number the server runs on to generate accurate QR Code for terminal.
 * @example 'http://10.0.0.2:3000/'
 */
function displayQRCode(port = '3000') {
    qrcode.toString(`http://${getLocalIp()}:${port}/`, (err, code) => console.log(code))
}

module.exports = displayQRCode