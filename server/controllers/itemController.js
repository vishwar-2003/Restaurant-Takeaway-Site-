const itemSchema = require("../models/item.js")

const getItems = async (req, res) => {
    const item = await itemSchema.find()
    res.send(item)
}

const insertItems = async (req, res) => {
    const data = new itemSchema({
        itemName : req.body.itemName,
        price : req.body.price
    })

    const a1 = await data.save()
    res.json(a1)
}

module.exports = {getItems, insertItems}