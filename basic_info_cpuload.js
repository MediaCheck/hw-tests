var colors = require('colors');

/*
 TEST cpuload
 */
//information from basic_info_all_tests
module.exports = function (clientObj, doneCallback) {
    //initial message
    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to cpuload info"));
    //message we send in
    clientObj.sendMessage(clientObj.clientId, "/info_in/cpuload", {}, function (payload, topic, err) {
        //error with error message
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        //all right message
        if (payload.status == "ok" && typeof payload.cpuload == "number") {
            clientObj.verboselog(colors.green("Hotovo šéfe"));
            var cpuload = payload.cpuload;
            if (cpuload == 0) {
                cpuload = colors.red(cpuload);
            }
            doneCallback(null, {
                cpuload: cpuload
            });
        }
        //error message without specified reason
        else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or cpuload is not set!");
        }
    });

}
// End of test