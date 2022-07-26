const folderLogic = require('../BL/folderLogic')
const multer = require('multer')
upload = multer()
const express = require('express'),
    router = express.Router()

//change to *? and there is no need to change ***
router.get('/all/:folder*?', (req, res) => {
    const folderParent = req.params.folder + req.params[0]
    console.log("this is the folders: " + Object.prototype.toString.call(req.params));
    try {
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
    try {
        const { folderName, folderParent } = req.body
        console.log("req", req.body);
        res.send(folderLogic.deleteFolder(folderName, folderParent))
    } catch (error) {
        res.send(error)
    }
})

router.post('/edit', (req, res) => {
    try {
        const { folderName, folderParent, folderNewName } = req.body
        console.log("req", req.body);
        res.send(folderLogic.renameFolder(folderName, folderParent, folderNewName))
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})




module.exports = router