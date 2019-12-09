const fs = require('fs');
const { Transform } = require("stream");
const {getName, getDataFromCSV, formatValues} = require("./helper");

function csv2json(filename) {
    
    const readstream = fs.createReadStream(filename);
    const writestream = fs.createWriteStream(getName(filename, "", ".json"));
    const transformstream = new Transform({
        transform(chunk, encoding, callback) {
            const {keys, values} = getDataFromCSV(chunk.toString())
            let arrJson = [];

            for (let i = 0; i < values.length; i++) {
                const arrRows = values[i].split(";")
                let obj = {};
                for (let j = 0; j < arrRows.length; j++) { 
                    const key = keys[j];
                    obj[key] = formatValues(key, arrRows[j]);
                }
                arrJson.push(obj)
                obj = {};

            }
            this.push(JSON.stringify(arrJson, null, 4));
            callback();
        }
    })
    readstream.pipe(transformstream).pipe(writestream);
}

module.exports = {
    csv2json
}