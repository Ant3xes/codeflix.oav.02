const { duplicate } = require("./e01")
const { transform } = require("./e02")
const { transformStdout } = require("./e03")
const { csvToJson } = require("./e04")

module.exports = {
    transformStdout,
    transform,
    duplicate,
    csvToJson
}