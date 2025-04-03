const MenuItem = require('../models/MenuItems');

const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const insertMenuItems = async (req, res) => {
        try{
            const data = Array.isArray(req.body) ? req.body : [req.body];
            const newItem = await MenuItem.insertMany(data)
            res.status(200).json(newItem)
        }
        catch(err){
            res.status(500).send(err)
        }
    }

module.exports = {getMenuItems, insertMenuItems};
