var colors = require('colors');

/*
 TEST firmware
 */
module.exports = function (clientObj, doneCallback, param) {

    console.log(colors.yellow("Vypisuju tady nějaké to version info"));

    var props = param;
    if (!props) {
        props = {};
    }

    clientObj.sendMessage(clientObj.clientId, "/info_in/version", props, function (payload, topic, err) {
        if (err) {
            console.log(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok" && payload.component && payload.version && typeof payload.size == "number" && typeof payload.crc == "number" && typeof payload.timestamp == "number" && payload.build_id && payload.name) {
            console.log(colors.green("Hotovo šéfe"));
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
            console.log(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or version is not set!");
        }
    });


}
