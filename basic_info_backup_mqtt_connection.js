var colors = require('colors');

/*
 TEST backup_mqtt_connection
 */
module.exports = function (clientObj, doneCallback) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to backup_mqtt_connection info"));
    clientObj.sendMessage(clientObj.clientId, "/info_in/backup_mqtt_connection", {}, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if ( (payload.status == "ok") && payload.connection) {
            clientObj.verboselog(colors.green("Hotovo šéfe"));
            doneCallback(null, {
                backup_mqtt_connection: payload.connection,
            });
        } else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or backup_mqtt_connection is not set!");
        }
    });


}
