const fs = require("fs")
if (!fs.existsSync("root"))
    fs.mkdirSync("root")

fs.writeFileSync("root/name.txt", "my name is Avi")
fs.appendFileSync("root/name.txt", "\n and you are not")
const text = fs.readFileSync("root/name.txt", { encoding: "utf-8" })
console.log(text);
const files = fs.readdirSync("root")
console.log(files);
files.forEach(file => fs.unlinkSync(`root/${file}`))
// fs.unlinkSync("root/name.txt")
// fs.rmdirSync("root")

fs.writeFileSync("root/log.json", JSON.stringify({ error: "some error" }))
const x = require("./root/log.json")
console.log(x);

fs.renameSync("root/log.json", "root/LOG.json")