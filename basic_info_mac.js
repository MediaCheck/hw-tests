var colors = require('colors');

/*
 TEST mac
 */
module.exports = function (clientObj, doneCallback) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to mac info"));
    clientObj.sendMessage(clientObj.clientId, "/info_in/mac", {}, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok" && payload.mac) {
            clientObj.verboselog(colors.green("Hotovo šéfe"));
            doneCallback(null, {
                mac: payload.mac,
            });
        } else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or mac is not set!");
        }
    });


}
