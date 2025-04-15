const express = require('express');
const router = express.Router();
const { getMenuItems, insertMenuItem } = require('../controllers/MenuController');

router.get('/', getMenuItems);
router.post('/', insertMenuItem);

module.exports = router;