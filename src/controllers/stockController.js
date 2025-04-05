const asyncHandler = require("express-async-handler")
const MQTTGroup = require("../database/mqttGroupModel")
const MQTTTopic = require("../database/mqttTopicModel")
const Item = require("../database/itemModel")
const Reading = require("../database/readingModel")

/*
    Get corresponding mqtt feed data by item id
*/
exports.get_item_feed = asyncHandler(async (req, res) => {

    if(!req.query.itemId){
        return res.status(400).send("No item id given")
    }

    const item = Item.getItemById({itemId: req.query.itemId})

    if(item){
        if(req.query.start && req.query.end){
            // TODO implement date range selection
        }

        const readings = req.query.limit ? await Reading.getReadingsByItemId({itemId: req.query.itemId, limit: req.query.limit}) : await Reading.getReadingsByItemId({itemId: req.query.itemId, limit: 99999999})
        console.log(readings)

        return res.status(200).json(readings)
    } else{
        return res.status(404).send("No item found for provided ID")
    }

});

/*
    Get all items available by branch ID
*/
exports.get_items_for_branch = asyncHandler(async (req, res) => {

    if(!req.query.branchId){
        res.status(400).send("No branch id given")
    }

    let items = await Item.getAllItemsByBranchId({branchId: req.query.branchId})
    console.log(items)
    if (items?.length){
        return res.status(200).json(items)
    } else{
        return res.status(404).send("No items found for branch")
    }
});

exports.create_feed = asyncHandler(async (req, res) => {

    const url = `https://io.adafruit.com/api/v2/${process.env.MQTT_USERNAME}/feeds/`
    console.log(url)

    const data = {
        feed: {
            name: "test-feed"
        }
    }

    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "x-aio-key": process.env.ADAFRUIT_AIO_KEY,
            },
            body: JSON.stringify(data),

        })

        if(!response.ok){
            console.log(response.status)
        }

        const json = await response.json();
        console.log(json);
    } catch(err){
        console.log(err)
    }
});

/*
    Create feed in group.
    This is hit when setting up hardware
    TODO: add API key authentication
*/
exports.create_group_feed = asyncHandler(async (req, res) => {

    console.log(req.body.groupKey)

    let group = await MQTTGroup.findGroupByKey({key: req.body.groupKey})
    let item = await Item.findItemIdByName({name: req.body.clientId})

    if(!group){
        return res.status(400).json({message: "Group does not exist!"})
    }

    if(item){
        return res.status(400).json({message: "Item name already exists!"})
    }

    const url = `https://io.adafruit.com/api/v2/${process.env.MQTT_USERNAME}/groups/${req.body.groupKey}/feeds/`
    const feed = `${process.env.MQTT_USERNAME}/feeds/${req.body.groupKey}.${req.body.clientId}`

    const data = {
        feed: {
            name: `${req.body.clientId}`
        }
    }

    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "x-aio-key": process.env.ADAFRUIT_AIO_KEY,
            },
            body: JSON.stringify(data),

        })

        if(!response.ok){
            console.log(response.status)
            return res.status(400).json({error: "Bad request"})
        }

        let branch = await MQTTGroup.getBranchId({id: group.id})
        console.log(branch)

        await Item.createNewItem({name: req.body.clientId, reading: 0, branchId: branch.branchId})

        let item = await Item.findItemIdByName({name: req.body.clientId})

        await MQTTTopic.createNewTopic({topic: feed, qos: 0, last_payload: '', itemId: item.id})
        
        return res.status(200).json({feedName: feed})
    } catch(err){
        console.log(err)
    }
});
