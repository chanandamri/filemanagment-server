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
router.post('/edit', (req, res) => {
    try {
        const { folderName, folderParent, folderNewName } = req.body
        console.log("req", req.body);
        res.send(fileLogic.renameFile(folderName, folderParent, folderNewName))
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})
// router.get('/all/:folder*?', (req, res) => {
//     try {
//         const folderParent = req.params.folder + req.params[0]
//         res.send(fileLogic.getAllFiles(folderParent))

//     } catch (error) {
//         console.log(error);
//     }

// })
router.post('/delete', async (req, res) => {
    try {
        const { folderName, folderParent } = req.body
        console.log("req", req.body);
        res.send(fileLogic.deleteFile(folderName, folderParent))
    } catch (error) {
        res.send(error)
    }

})

router.post('/create', upload.single('fileName'), async (req, res) => {
    try {
        fileLogic.saveFile(req.file, req.body.folderParent)
        res.send("ok")
    } catch (error) {
        console.log(error);
    }
})

module.exports = router