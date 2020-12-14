var colors = require('colors');

/*
 TEST device_get
 */
module.exports = function (clientObj, doneCallback, param, returnObject) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to device get info"));

    var props = param;
    if (!props) {
        props = {};
    }

    clientObj.sendMessage(clientObj.clientId, "/command_in/device/get", props, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok") {
            clientObj.verboselog(colors.green("Hotovo šéfe"));

            returnObject[props.device_count] = payload.full_id;

            doneCallback(null, {
                full_id: payload.full_id,
            });
        } else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or version is not set!");
        }
    });


}
