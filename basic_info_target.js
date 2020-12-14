var colors = require('colors');

/*
 TEST target
 */

//information from basic_info_all_tests
module.exports = function (clientObj, doneCallback) {

    //initial message
    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to target info"));

    //message we send in
    clientObj.sendMessage(clientObj.clientId, "/info_in/target", {}, function (payload, topic, err) {
        //error with error message
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        //all right message
        if (payload.status == "ok" && payload.target) {
            clientObj.verboselog(colors.green("Hotovo šéfe"));
            doneCallback(null, {
                target: payload.target
            });
        }
        //error message without specified reason
        else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or target is not set!");
        }
    });

}
// End of test