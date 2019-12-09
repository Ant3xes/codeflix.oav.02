const fs = require('fs');
const { Transform } = require("stream");
const {getName} = require("./helper");

function transform(filename, re, fn) {
    
    const readstream = fs.createReadStream(filename);
    const writestream = fs.createWriteStream(getName(filename, ".transform"));
    const transformstream = new Transform({
        transform(chunk, encoding, callback) {
            this.push(chunk.toString().replace(re, str => fn(str)));
            callback();
        }
    })
    readstream.pipe(transformstream).pipe(writestream);
}

module.exports = {
    transform
}