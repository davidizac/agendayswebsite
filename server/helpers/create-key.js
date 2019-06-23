const crypto = require('crypto');


function randomValueHex(len) {
    return crypto.randomBytes(len).toString('hex').slice(0, len);
}

module.exports = {

    generateKey: () => {
        return randomValueHex(32);
    }
};