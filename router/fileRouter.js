const fileLogic = require('../BL/fileLogic')
const multer = require('multer')
upload = multer()
const express = require('express'),
    router = express.Router()
// fs = require("fs")
// router.post('/create', async (req, res) => {
//     try {
//         console.log("req", req.body);
//         const { fileName, content } = req.body
//         const newfile = await fileLogic.createFile(fileName, content)
//         res.send(newfile)
//     }
//     catch (error) {
//         res.send(error)
//     }
// })
router.put('/updatefile', async (req, res) => { })
router.get('/getfile', async (req, res) => { })
router.delete('/deletefile', async (req, res) => { })
router.post('/create', upload.single('fileName'), async (req, res) => {
    try {
        console.log(req.file);
        console.log(req.file.buffer);
        fileLogic.saveFile(req.file)
        res.send("ok")
    } catch (error) {
        console.log(error);
    }
})

module.exports = router