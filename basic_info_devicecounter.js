var colors = require('colors');

/*
 TEST device_counter
 */
module.exports = function (clientObj, doneCallback, param, returnObject) {


    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to device_counter info"));
    clientObj.sendMessage(clientObj.clientId, "/info_in/device_counter", {}, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok" && typeof payload.device_counter == "number") {
            clientObj.verboselog(colors.green("Hotovo šéfe"));
            returnObject["device_counter"] = payload.device_counter;
            doneCallback(null, {
                device_counter: payload.device_counter,
            });
        } else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or there's no device!");
        }
    });


}
