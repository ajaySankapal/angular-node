const DataUriParser = require('datauri/parser')
const path = require('path')
const getDataUri = (photo) => {
    const parser = new DataUriParser()
    const extName = photo.originalname ? path.extname(photo.originalname).toString() : ""
    console.log(extName)
    return parser.format(extName, photo.buffer)
}

module.exports = getDataUri