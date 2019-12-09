const fs = require('fs');
const {getName} = require("./helper");

function duplicate(filename) {
    
    const readStream = fs.createReadStream(filename);
    const writestream = fs.createWriteStream(getName(filename, ".duplicate"));
    
    readStream.pipe(writestream);
    console.log(`File: ${filename} successfully duplicated!`)
}

module.exports = {
    duplicate
}