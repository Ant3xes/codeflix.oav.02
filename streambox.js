const { duplicate } = require("./e01")
const { transform } = require("./e02")
const { transformStdout } = require("./e03")
const { csv2json } = require("./e04")

module.exports = {
    transformStdout,
    transform,
    duplicate,
    csv2json
}