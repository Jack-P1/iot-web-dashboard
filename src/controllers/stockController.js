const asyncHandler = require("express-async-handler")

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

    const url = `https://io.adafruit.com/api/v2/${process.env.MQTT_USERNAME}/groups/${req.body.groupKey}/feeds/`
    console.log(url)
    console.log(req.body.groupKey)
    const data = {
        feed: {
            name: `${req.body.feedName}`
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
            res.status(400).json({error: "Bad request"})
        }

        return res.status(200).json({message: "Feed created sucessfully"})
    } catch(err){
        console.log(err)
    }
});