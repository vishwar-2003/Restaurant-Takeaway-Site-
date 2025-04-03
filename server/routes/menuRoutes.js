const express = require('express');
const router = express.Router();
const { getMenuItems, insertMenuItems } = require('../controllers/MenuController');

router.get('/api/menu/items', getMenuItems);
router.post('/api/menu/items', insertMenuItems);

module.exports = router;