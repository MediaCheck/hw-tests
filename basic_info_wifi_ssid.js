var colors = require('colors');

/*
 TEST wifi_ssid
 */
module.exports = function (clientObj, doneCallback) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to wifi_ssid info"));
    clientObj.sendMessage(clientObj.clientId, "/info_in/wifi_ssid", {}, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok" && payload.ssid) {
            clientObj.verboselog(colors.green("Hotovo šéfe"));
            doneCallback(null, {
                wifi_ssid: payload.ssid,
            });
        } else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or wifi_ssid is not set!");
        }
    });


}
