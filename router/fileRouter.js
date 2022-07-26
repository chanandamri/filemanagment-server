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
router.get('/all/:folder*?', (req, res) => {
    try {
        const folderParent = req.params.folder + req.params[0]
        res.send(fileLogic.getAllFiles(folderParent))

    } catch (error) {
        console.log(error);
    }

})
router.delete('/deletefile', async (req, res) => { })

router.post('/create', upload.single('fileName'), async (req, res) => {
    try {
        fileLogic.saveFile(req.file, req.body.folderParent)
        res.send("ok")
    } catch (error) {
        console.log(error);
    }
})

module.exports = router