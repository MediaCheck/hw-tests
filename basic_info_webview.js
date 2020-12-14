var colors = require('colors');

/*
 TEST webview
 */
module.exports = function (clientObj, doneCallback) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to webview info"));
    clientObj.sendMessage(clientObj.clientId, "/info_in/webview", {}, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok" && payload.webview) {
            clientObj.verboselog(colors.green("Hotovo šéfe"));

            doneCallback(null, {
                webview: payload.webview,

            });
        } else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or webview is not set!");
        }
    });


}
