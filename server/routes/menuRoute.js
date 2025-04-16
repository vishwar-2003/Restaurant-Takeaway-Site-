const express = require('express');
const router = express.Router();
const { getMenuItems, insertMenuItem } = require('../controllers/MenuController');

//Get menu items
router.get('/', getMenuItems);

//Insert menu Items
router.post('/', insertMenuItem);

module.exports = router;