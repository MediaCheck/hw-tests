var colors = require('colors');

/*
 TEST autobackup
 */
module.exports = function (clientObj, doneCallback) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to autobackup info"));
    clientObj.sendMessage(clientObj.clientId, "/info_in/autobackup", {}, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok" && typeof payload.autobackup == "boolean") {
            clientObj.verboselog(colors.green("Hotovo šéfe"));
            doneCallback(null, {
                autobackup:payload.autobackup,
            });
        } else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or autobackup is not set!");
        }
    });


}
