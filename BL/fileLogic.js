const fs = require('fs')
const createFile = function (fileName, content) {
    if (!fs.existsSync(`root/${fileName}.txt`)) {
        fs.writeFileSync(`root/${fileName}.txt`, content)
        return "file added"
    }
    return "file exists"
}

const renameFile = function (fileName, folderParent, fileNewName) {
    if (!fs.existsSync(`${folderParent}/${fileName}`))
        return "No file with this name"
    if (!isValidName(fileNewName))
        return "invalid name"
    if (isExists(`${folderParent}/${fileNewName}`))
        return "name already in user"
    const type = fileName.slice(fileName.lastIndexOf(".") + 1)
    console.log(type);
    fs.renameSync(`./${folderParent}/${fileName}`, `./${folderParent}/${fileNewName}.${type}`)
    return "folder changed name to:", fileNewName
}

const deleteFile = function (fileName, folderParent) {
    console.log(`file to be deleted - ${folderParent}/${fileName}`);
    if (!isExists(`${folderParent}/${fileName}`))
        throw { code: 475, message: "no file" }
    fs.unlinkSync(`${folderParent}/${fileName}`)
    return "file deleted"
}
function isValid(req, res, next) {
    const { fileName } = req.body
    const res1 = isValidExtension(fileName)
    if (res1)
        next()
    res.status(450).json("blabla")
}
function isExists(fileName) {
    return fs.existsSync(fileName)
}
function isValidName(fileName) {
    return ["/", "\\", "*", ":", "|", "?", "<", ">", `"`].find(char => fileName.includes(char)) ? false : true
}
function isValidExtension(fileName) {
    let ext = fileName.slice(fileName.lastIndexOf("."))
    return ["txt", "json", "pdf"].find(char => ext == char) ? true : false
}
function saveFile(file, folderParent) {
    const adjParent = folderParent.replaceAll("***", "/")
    fs.writeFileSync(adjParent + "/" + file.originalname, file.buffer)
}

function getAllFiles(folderParent) {
    const adjParent = folderParent.replaceAll("***", "/")
    const files = fs.readdirSync(adjParent, { withFileTypes: true }).filter((item) => item.isFile()).map(item => item.name)
    return files
}

module.exports = { createFile, renameFile, deleteFile, isValid, saveFile, getAllFiles }