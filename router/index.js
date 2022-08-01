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
        console.log(req.params.folder);
        console.log(req.params[0]);
        const folderParent = req.params.folder + req.params[0]
        console.log("this is the parent folder: " + folderParent);
        allData = generalLogic.allList(folderParent)
        console.log("this is all the data for " + folderParent + " :" + allData);
        res.send(allData);
    }
    catch (error) {
        res.send(error)
    }
})

module.exports = router