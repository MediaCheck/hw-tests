var colors = require('colors');

/*
 TEST uptime
 */
module.exports = function (clientObj, doneCallback) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to uptime info"));
    clientObj.sendMessage(clientObj.clientId, "/info_in/uptime", {}, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok" && typeof payload.uptime == "number") {
            clientObj.verboselog(colors.green("Hotovo šéfe"));
            doneCallback(null, {
                uptime: payload.uptime,
            });
        } else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or uptime is not set!");
        }
    });


}
