const fs = require('fs')
const createFile = function (fileName, content) {
    if (!fs.existsSync(`root/${fileName}.txt`)) {
        fs.writeFileSync(`root/${fileName}.txt`, content)
        return "file added"
    }
    return "file exists"
}

const updateFile = function (fileName, content) {
    if (!fs.existsSync(`root/${fileName}.txt`))
        return "No file with this name"
    fs.appendFileSync(`root/${fileName}.txt`, content)
    return "file updated"
}

const deleteFile = function (fileName) {
    if (!isExists(fileName))
        throw { code: 475, message: "no file" }
    fs.unlinkSync(`root/${fileName}`)
}
function isValid(req, res, next) {
    const { fileName } = req.body
    const res1 = isValidExtension(fileName)
    if (res1)
        next()
    res.status(450).json("blabla")
}
function isExists(fileName) {
    return fs.existsSync(`./root${fileName}`)
}
function isValidName(fileName) {
    return ["/", "\\", "*", ":", "|", "?", "<", ">", `"`].find(char => fileName.includes(char)) ? false : fs.existsSync(`./root${fileName}`)
}
function isValidExtension(fileName) {
    let ext = fileName.slice(fileName.lastIndexOf("."))
    return ["txt", "json", "pdf"].find(char => ext == char) ? true : false
}
function saveFile(file) {
    fs.writeFileSync('upload/' + file.originalname, file.buffer)
}

module.exports = { createFile, updateFile, deleteFile, isValid, saveFile }