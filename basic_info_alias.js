var colors = require('colors');

/*
 TEST alias
 */
module.exports = function (clientObj, doneCallback) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to alias info"));
    clientObj.sendMessage(clientObj.clientId, "/info_in/alias", {}, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok") {
            clientObj.verboselog(colors.green("Hotovo šéfe"));

            doneCallback(null, {
                alias: payload.alias,

            });
        } else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or alias is not set!");
        }
    });


}
