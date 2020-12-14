var colors = require('colors');

/*
 TEST console
 */
module.exports = function (clientObj, doneCallback) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to console info"));
    clientObj.sendMessage(clientObj.clientId, "/info_in/console", {}, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok" && typeof payload.console == "boolean") {
            clientObj.verboselog(colors.green("Hotovo šéfe"));

            doneCallback(null, {
                console: payload.console,

            });
        } else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or console is not set!");
        }
    });


}
