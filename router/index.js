const express = require("express"),
    router = express.Router(),
    folderRouter = require('./folderRouter'),
    fileRouter = require('./fileRouter')
router.use('/folders', folderRouter)
router.use('/files', fileRouter)

module.exports = router