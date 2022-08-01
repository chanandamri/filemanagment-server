const fs = require('fs')

function getType(data) {
    return (data.isDirectory()) ? { name: data.name, type: "folder" } : { name: data.name.slice(0, data.name.lastIndexOf(".")), type: data.name.slice(data.name.lastIndexOf(".") + 1) }
}
function allList(folderParent) {
    if (!fs.existsSync(folderParent)) {
        "no such folder"
    }
    try {
        const allData = fs.readdirSync(folderParent, { withFileTypes: true })
        console.log({ allData });
        if (allData.length == 0)
            return []

        const newdata = allData.map(data => getType(data))
        console.log(newdata);
        return newdata
    } catch (error) {
        return error
    }
}
module.exports = { allList }