var colors = require('colors');

/*
 TEST wifi
 */
module.exports = function (clientObj, doneCallback) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to wifi info"));
    clientObj.sendMessage(clientObj.clientId, "/info_in/wifi", {}, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok" && payload.firmware && payload.mac && typeof payload.espid == "number" && typeof payload.flashid == "number" && typeof payload.flashsize == "number" && typeof payload.flashspeed == "number") {
            clientObj.verboselog(colors.green("Hotovo šéfe"));

            if (!payload.mac.match(/[0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2}/g)) {
                doneCallback(null, "Mac is not correct (got: "+payload.mac+")");
                return;
            }

            doneCallback(null, {
                firmware: payload.firmware,
                mac: payload.mac,
                espid: payload.espid,
                flashid: payload.flashid,
                flashsize: payload.flashsize,
                flashspeed: payload.flashspeed,
            });
        } else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or wifi is not set!");
        }
    });


}
