const express = require("express")
const router = express.Router()
const {getItems, insertItems} = require("../controllers/itemController")

router.get('/items', getItems)
router.post('/items', insertItems)

module.exports = router