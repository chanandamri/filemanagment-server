const express = require("express")
const fs = require('fs')
const router = require('./router')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 3001


app = express()
const multer = require('multer')
upload = multer({ dest: "./upload/" })

app.use(express.json())
app.use(require('cors')())

app.use((req, res, next) => {
    let logs = []
    try {
        if (fs.existsSync("log/logger.json")) {
            logs = require("./log/logger.json")
        }
        logs.push({ url: req.originalUrl, date: Date.now() })
        fs.writeFileSync("log/logger.json", JSON.stringify(logs))

    } catch (error) {
        console.log("something went wrong", error);
    }


    next()
})

app.use("/api", router)
app.listen(PORT, () => console.log("server is alive with port: " + PORT))
