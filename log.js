var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://m24.cloudmqtt.com", {
    username: "vdqdgzbp",
    password: "pA1rfyZkOIEM",
    port: 15228,
    clientId: "Macbook",
    clean: false
});

var readline = require("readline");
var log = console.log;

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
client.on("connect", function() {
    client.subscribe("test");

    var recursiveAsyncReadLine = function() {
        rl.question("Payload:\n", function(answer) {
            if (answer == "exit")
                //we need some base case, for recursion
                return rl.close(); //closing RL and returning from function.
            let ans = answer.split("/");
            if (ans.length == 2)
                client.publish(ans[0], ans[1], null, e => {
                    if (e) {
                        log(e.message);
                    }
                });

            recursiveAsyncReadLine();

            //Calling this function again to ask new question
        });
    };

    recursiveAsyncReadLine();
});
client.on("message", function(topic, message) {
    context = message.toString();
    console.log("topic:" + topic + " message:" + context);
});
