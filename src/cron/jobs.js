const MqttTopic = require('../database/mqttTopicModel')

/*
    Get MQTT feed data at a set interval defined in app.js.
    This could be improved by implementing concurrency and limiting the amount of API requests (e.g. p-limit).

    TODO: write to database
*/
exports.getBatchMqttData = async () => {
    const results = await MqttTopic.getAllTopicAndBranchId()

    const endpoints = results.map(result => fetch(`https://io.adafruit.com/api/v2/${process.env.MQTT_USERNAME}/groups/${result.groupKey}/feeds/${result.topic}/data?limit=1`,
        {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "x-aio-key": process.env.ADAFRUIT_AIO_KEY,
            },
        }).then(res => res.json().then(json => ({
            data: json.length > 0 ? json[0].value : null,
            id: result.id,
            topic: result.topic
        })))
    )

    const responses = await Promise.all(endpoints);

    console.log(responses)
}