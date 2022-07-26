const express = require("express")
const fs = require('fs')
const router = require('./router')


app = express()
const multer = require('multer')
upload = multer({ dest: "./upload/" })

app.use(express.json())
app.use(require('cors')())

app.use((req, res, next) => {
    let logs = []
    try {
        if (fs.existsSync("root/logger.json")) {
            logs = require("./root/logger.json")
        }
        logs.push({ url: req.originalUrl, date: Date.now() })
        fs.writeFileSync("root/logger.json", JSON.stringify(logs))

    } catch (error) {
        console.log("something went wrong", error);
    }


    next()
})

app.use("/api", router)
// app.get("/users", (req, res) => res.send("user"))
// router.use('/users', userRouter)


app.listen(3001, () => console.log("server is alive"))