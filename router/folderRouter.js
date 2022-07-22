const folderLogic = require('../BL/folderLogic')
const multer = require('multer')
upload = multer()
const express = require('express'),
    router = express.Router()

router.get('/all/:folder', (req, res) => {
    try {
        console.log(req.params.folder);
        const folderParent = req.params.folder
        console.log(folderParent);
        folders = folderLogic.folderList(folderParent)
        console.log(folders);
        res.send(folders);
    }
    catch (error) {
        res.send(error)
    }
})

router.post('/create', (req, res) => {
    const { folderName, folderParent } = req.body
    console.log("req", req.body);
    try {
        res.send(folderLogic.createFolder(folderName, folderParent))
    } catch (error) {
        res.send(error)
    }
})

router.post('/delete', (req, res) => {
    const { folderName, folderParent } = req.body
    console.log("req", req.body);
    try {
        res.send(folderLogic.deleteFolder(folderName, folderParent))
    } catch (error) {
        res.send(error)
    }
})

router.post('/edit', (req, res) => {
    const { folderName, folderParent, folderNewName } = req.body
    console.log("req", req.body);
    try {
        res.send(folderLogic.renameFolder(folderName, folderParent, folderNewName))
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})




module.exports = router