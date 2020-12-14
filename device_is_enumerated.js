var colors = require('colors');

/*
 TEST device_get
 */
module.exports = function (clientObj, doneCallback, param, returnObject) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to device get info"));

    var props = param || {};
    if (typeof props == "function") {
        props = props();
    }
    var TimeEnd = false;
    setTimeout(function () {
        if (TimeEnd == false){
            TimeEnd = true;
            doneCallback("Timeout Error. Failed to enumerate device!");
        }
    }, 5000);

    var testInner = function () {

        clientObj.sendMessage(clientObj.clientId, "/command_in/device/get", props, function (payload, topic, err) {
            if (TimeEnd == true) {
                return;
            }

            if (err) {
                clientObj.verboselog(colors.red("Error: ")+err.toString());
                doneCallback(err);
                TimeEnd = true;
                return;
            }
            if (payload.status == "ok") {
                clientObj.verboselog(colors.green("Hotovo šéfe"));

                var state = payload.state;
                if (state != 4) {
                    setTimeout(function(){
                        testInner();
                    }, 500);
                    return;
                }

                doneCallback(null, {
                    full_id: payload.full_id,
                });
                TimeEnd = true;
            } else {
                clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
                doneCallback("Status is not OK or version is not set!");
                TimeEnd = true;
            }
        });

    }

    testInner();




}
