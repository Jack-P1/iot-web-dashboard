const asyncHandler = require("express-async-handler")

exports.stock_list = asyncHandler(async (req, res) => {
    const params = new URLSearchParams()
    params.append("username", process.env.MQTT_USERNAME)
    params.append("feed_key", process.env.MQTT_FEED_KEY)

    // const url = `https://io.adafruit.com/api/v2/${process.env.MQTT_USERNAME}/feeds/${process.env.MQTT_FEED_KEY}?x-aio-key=${process.env.ADAFRUIT_AIO_KEY}`
    const url = `https://io.adafruit.com/api/v2/${process.env.MQTT_USERNAME}/feeds/${process.env.MQTT_FEED_KEY}`
    console.log(params)
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
