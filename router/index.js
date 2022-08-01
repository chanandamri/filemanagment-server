const express = require("express"),
    router = express.Router(),
    folderRouter = require('./folderRouter'),
    fileRouter = require('./fileRouter'),
    generalLogic = require('../BL/generalLogic'),
    folderLogic = require('../BL/folderLogic')

router.use('/folders', folderRouter)
router.use('/files', fileRouter)
router.get('/all/:folder*?', (req, res) => {
    try {
        const folderParent = req.params.folder + req.params[0]
        allData = generalLogic.allList(folderParent)
        console.log("this is all the data for folder - " + folderParent + " :" + allData);
        res.send(allData);
    }
    catch (error) {
        res.send(error)
    }
})

module.exports = router