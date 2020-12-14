var colors = require('colors');

/*
 TEST device_add
 */
module.exports = function (clientObj, doneCallback, param) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to device add info"));

    var props = param || {};
    if (typeof props == "function") {
        props = props();
    }
    clientObj.sendMessage(clientObj.clientId, "/command_in/device/add", props, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok") {
            clientObj.verboselog(colors.green("Hotovo šéfe"));

            doneCallback(null, {
                status: payload.status,
            });
        } else {
            console.log(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or version is not set!");
        }
    });


}
