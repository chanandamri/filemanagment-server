const { log } = require("console")
const fs = require("fs")
function createDir(dir) {
    if (!fs.existsSync("root"))
        fs.mkdirSync("root")
}
function checkFileName(folder, fileName) {
    const files = fs.readdirSync(folder)
    return files.find(file => {
        modifyedname = file.slice(0, file.lastIndexOf("."))
        console.log(fileName);
        console.log("modifyed name", modifyedname);
        modifyedname == fileName
    })
}
function test(fileName, data) {
    const type = typeof (data)
    console.log({ type });
    const filtexist = checkFileName("root", fileName)
    console.log({ filtexist });
    if (filtexist)
        return "file already exsits"
    if (type == undefined || type == "number") return "error"
    else if (type == "string") fs.writeFileSync(`root/${fileName}.txt`, data)
    else fs.writeFileSync(`root/${fileName}.json`, JSON.stringify(data))
}
const check = test("test", `{ error: "some error!" }`)
console.log(check);