var colors = require('colors');

/*
 TEST wifi_password
 */
module.exports = function (clientObj, doneCallback) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to wifi_password info"));
    clientObj.sendMessage(clientObj.clientId, "/info_in/wifi_password", {}, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok" && payload.password) {
            clientObj.verboselog(colors.green("Hotovo šéfe"));
            doneCallback(null, {
                wifi_password: payload.password,
            });
        } else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or wifi_password is not set!");
        }
    });


}
