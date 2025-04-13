const asyncHandler = require("express-async-handler")
const Item = require("../database/itemModel")
const Reading = require("../database/readingModel")

exports.edit_item = asyncHandler(async (req, res) => {
    const requiredParams = ['itemId', 'name', 'description'];

    for (const param of requiredParams) {
        if (!(param in req.body)) {
            return res.status(400).send(`Missing required parameter: ${param}`);
        }
    }

    try{
        await Item.updateItem({name: req.body.name, description: req.body.description, itemId: req.body.itemId})
        return res.status(200).send("Item updated successfully")
    } catch(err){
        return res.status(500).send("Internal server error")
    }
})

exports.get_item = asyncHandler(async (req, res) => {
    if (!req.query.itemId) {
        res.status(400).send("No item id given")
    }

    let item = await Item.getItemById({ itemId: req.query.itemId })
    const reading = await Reading.getReadingsByItemId({ itemId: item.id, limit: 1 })
    const latest = reading[0]
    
    item.latestReading = latest ? latest.reading_value : null
    item.lastUpdated = latest ? latest.timestamp : null

    if (item){
        return res.status(200).json(item)
    } else{
        return res.status(404).send("No data for item provided")
    }
})

