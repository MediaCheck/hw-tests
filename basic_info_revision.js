var colors = require('colors');

/*
 TEST revision
 */
module.exports = function (clientObj, doneCallback) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to revision info"));
    clientObj.sendMessage(clientObj.clientId, "/info_in/revision", {}, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok" && payload.revision) {
            clientObj.verboselog(colors.green("Hotovo šéfe"));

            doneCallback(null, {
                revision: payload.revision,

            });
        } else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or revision is not set!");
        }
    });


}
