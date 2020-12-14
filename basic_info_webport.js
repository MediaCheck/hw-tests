var colors = require('colors');

/*
 TEST webport
 */
module.exports = function (clientObj, doneCallback) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to webport info"));
    clientObj.sendMessage(clientObj.clientId, "/info_in/webport", {}, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok" && payload.webport) {
            clientObj.verboselog(colors.green("Hotovo šéfe"));

            doneCallback(null, {
                webport: payload.webport,

            });
        } else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or webport is not set!");
        }
    });


}
