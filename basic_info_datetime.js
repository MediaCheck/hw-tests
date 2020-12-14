var colors = require('colors');

/*
 TEST datetime
 */
module.exports = function (clientObj, doneCallback) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to datetime info"));
    clientObj.sendMessage(clientObj.clientId, "/info_in/datetime", {}, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok" && typeof payload.datetime == "number") {
            clientObj.verboselog(colors.green("Hotovo šéfe"));
            doneCallback(null, {
                datetime: payload.datetime,
            });
        } else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or datetime is not set!");
        }
    });


}
