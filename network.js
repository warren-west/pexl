const os = require('os')

/**
 * Get the local WiFi IP address.
 * @returns {String} IP address.
 */
function getLocalIp() {
    const wifiAddresses = os.networkInterfaces()['WiFi']
    
    let localIp = undefined
    // Iterate over addresses for WiFi
    for (const addr of wifiAddresses) {
        // Skip internal (loopback) and IPv6 addresses
        if (addr.family === 'IPv4' && addr.address.startsWith('192.168')) {
            localIp = addr.address
            break // Stop at the first valid IPv4 address
        }
    }

    return localIp
}

module.exports = getLocalIp