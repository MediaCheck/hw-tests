var colors = require('colors');

/*
 TEST version
 */
module.exports = function (clientObj, doneCallback, param) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to version info"));

    var props = param || {};
    if (typeof props == "function") {
        props = props();
    }

    var topic = "/info_in/version"
    if (props["deviceId"]) {
        topic ="/device_in/"+props["deviceId"] + "/info_in/version"
    }

    clientObj.sendMessage(clientObj.clientId, topic, {"component": props["component"]}, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok" && payload.component && payload.version && typeof payload.size == "number" && typeof payload.crc == "number" && typeof payload.timestamp == "number" && payload.build_id && payload.name) {
            clientObj.verboselog(colors.green("Hotovo šéfe"));
            var size = payload.size;
            if (size == 0) {
                size = colors.red(size);
            }
            var crc = payload.crc;
            if (crc == 0) {
                crc = colors.red(crc);
            }
            var timestamp = payload.timestamp;
            if (timestamp == 0) {
                timestamp = colors.red(timestamp);
            }
            doneCallback(null, {
                component: payload.component,
                version: payload.version,
                size: size,
                crc: crc,
                timestamp: timestamp,
                build_id: payload.build_id,
                name: payload.name,
            });
        } else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or version is not set!");
        }
    });


}
