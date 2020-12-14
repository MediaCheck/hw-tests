var colors = require('colors');

/*
 TEST state
 */
module.exports = function (clientObj, doneCallback) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to state info"));
    clientObj.sendMessage(clientObj.clientId, "/info_in/state", {}, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok" && payload.backup && payload.buffer) {
            clientObj.verboselog(colors.green("Hotovo šéfe"));
            doneCallback(null, {
                backup: payload.backup,
                buffer: payload.buffer,
            });
        } else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or state is not set!");
        }
    });


}
