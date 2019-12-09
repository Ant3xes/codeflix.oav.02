const fs = require('fs');
const { Transform } = require("stream");
const {getName} = require("./helper");

function transformStdout(filename, re, fn, inStdout = true) {
    
    const readstream = fs.createReadStream(filename);

    if(inStdout) {
        let content = "";
        readstream.on("data", chunk => {
            content += chunk.toString().replace(re, str => fn(str));
        })

        readstream.on("end", () => {
            console.log(content)
        })
    } else {
        const writestream = fs.createWriteStream(getName(filename, ".transform"));
        const transformstream = new Transform({
            transform(chunk, encoding, callback) {
                this.push(chunk.toString().replace(re, str => fn(str)));
                callback();
            }
        })
        readstream.pipe(transformstream).pipe(writestream);
    }
}

module.exports = {
    transformStdout
}