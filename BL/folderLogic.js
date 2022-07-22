const fs = require('fs')


function folderList(folderParent) {
    if (!fs.existsSync(folderParent)) {
        "no such folder"
    }
    try {
        const adjParent = folderParent.replaceAll("***", "/")
        const folders = fs.readdirSync(adjParent, { withFileTypes: true }).filter((item) => item.isDirectory()).map(item => item.name)
        if (folders.length == 0)
            return []
        return folders
    } catch (error) {
        return []
    }
}

function isExists(folderName, folderParent) {
    return fs.existsSync(`./${folderParent}/${folderName}`)
}

function isValidName(fileName) {
    return ["/", "\\", "*", ":", "|", "?", "<", ">", `"`].find(char => fileName.includes(char)) ? false : true
}

function createFolder(folderName, folderParent) {
    try {
        const adjParent = folderParent.replaceAll("***", "/")
        if (isExists(folderName, adjParent))
            return "folder exists"
        if (!isValidName(folderName))
            return "invalid charecters"
        fs.mkdirSync(`./${adjParent}/${folderName}`)
        return "folder created"
    } catch (error) {
        return error
    }
}
function deleteFolder(folderName, folderParent) {
    try {
        const adjParent = folderParent.replaceAll("***", "/")
        if (!isExists(folderName, adjParent))
            throw ({ code: 404, message: "folder not exists" })
        if (fs.readdirSync(`./${adjParent}/${folderName}`).length > 0)
            throw ({ code: 405, message: "folder has content. cannot delete" })
        fs.rmdirSync(`./${adjParent}/${folderName}`)
        return "folder deleted"
    } catch (error) {
        return error
    }
}
function renameFolder(folderName, folderParent, folderNewName) {
    try {
        const adjParent = folderParent.replaceAll("***", "/")
        if (!isExists(folderName, adjParent))
            return "folder not exists"
        if (!isValidName(folderNewName))
            return "invalid charecters"
        if (isExists(folderNewName, adjParent))
            return "name already in user"
        fs.renameSync(`./${adjParent}/${folderName}`, `./${adjParent}/${folderNewName}`)
        return "folder changed name to:", folderNewName
    } catch (error) {
        console.log(error);
        return error
    }
}



module.exports = { folderList, createFolder, deleteFolder, renameFolder }