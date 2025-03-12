const asyncHandler = require("express-async-handler")
const MQTTGroup = require("../database/mqttGroupModel")
const MQTTTopic = require("../database/mqttTopicModel")
const Item = require("../database/itemModel")

exports.stock_list = asyncHandler(async (req, res) => {

    const url = `https://io.adafruit.com/api/v2/${process.env.MQTT_USERNAME}/feeds/${process.env.MQTT_FEED_KEY}`
    console.log(url)

    try{
        const response = await fetch(url, {
            headers: {
                "x-aio-key": process.env.ADAFRUIT_AIO_KEY,
            }
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