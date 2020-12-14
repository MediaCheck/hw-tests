var colors = require('colors');

/*
 TEST bootloader
 */
module.exports = function (clientObj, doneCallback) {


    clientObj.verboselog(colors.yellow("Info o desce"));
    clientObj.sendMessage(clientObj.clientId, "/info_in/bootloader", {}, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok" && payload.version) {
            clientObj.verboselog(colors.green("Výpis dokončen"));
            doneCallback(null, {
                version: payload.version,
            });
        } else {
            clientObj.verboselog(colors.red("ERROR"));
            doneCallback("Status is not OK or version is not set!");
        }
    });


}
