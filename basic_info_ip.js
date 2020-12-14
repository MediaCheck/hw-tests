var colors = require('colors');

/*
 TEST ip
 */
module.exports = function (clientObj, doneCallback) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to ip info"));
    clientObj.sendMessage(clientObj.clientId, "/info_in/ip", {}, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok" && payload.ip) {
            clientObj.verboselog(colors.green("Hotovo šéfe"));
            doneCallback(null, {
                ip: payload.ip
            });
        } else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or ip is not set!");
        }
    });

}
