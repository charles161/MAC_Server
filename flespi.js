var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://mqtt.flespi.io", {
    username: process.env.FLESPI_KEY,
    port: 1883,
    clientId: "macbook",
    clean: false,
    will: {
        topic: "charles1616",
        payload: "Mac Disconnected",
        retain: true,
        qos: 2
    }
});

var readline = require("readline");
var log = console.log;

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let connect = () => {
    client.on("connect", function() {
        client.subscribe("macbook161", {
            qos: 2
        });
        client.publish(
            "charles_cool",
            "from mac",
            {
                qos: 2
            },
            e => {
                if (e) {
                    log(e.message);
                }
            }
        );

        var recursiveAsyncReadLine = function() {
            rl.question("Payload:\n", function(answer) {
                if (answer == "exit")
                    //we need some base case, for recursion
                    return rl.close(); //closing RL and returning from function.
                let ans = answer.split("/");
                if (ans.length == 2)
                    client.publish(
                        ans[0],
                        ans[1],
                        {
                            qos: 2
                        },
                        e => {
                            if (e) {
                                log(e.message);
                            }
                        }
                    );

                recursiveAsyncReadLine();
            });
        };

        recursiveAsyncReadLine();
    });
};

let message = () => {
    client.on("message", function(topic, message) {
        context = message.toString();
        console.log("topic:" + topic + " message:" + context);
    });
};

let error = () => {
    client.on("error", e => {
        console.log("Connection error... reconnecting...");
        //connect();
    });
};

connect();
message();
error();
