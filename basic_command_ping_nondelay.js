var colors = require('colors');

/*
 TEST ping
 */
module.exports = function (clientObj, doneCallback) {

    console.log(colors.yellow("Vypisuju tady něco o pingu"));

    var sendDoneCount = 0;
    var okCount = 0;

    //var date = new Date();
    var starttime = (new Date()).getTime();
    //var a = new Date();
    //var time = date.getMilliseconds();
var counter = 10;

    for (var i = 0; i < counter; i++) {

        clientObj.sendMessage(clientObj.clientId, "/command_in/system/ping", {}, function (payload, topic, err) {

            sendDoneCount++;

            if (err) {
                console.log(colors.red("Error: ")+err.toString());
            } else if (payload.status == "ok") {
                okCount++;
                console.log(colors.green("Hotovo šéfe"));
            } else {
                console.log(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            }

            if (sendDoneCount == counter) {
                if (okCount == counter) {
                    doneCallback(null, {
                        message: colors.yellow("From "+counter+" pings has been  "+okCount+" successful"),
                        time: (new Date()).getTime() - starttime+"ms"
                    });
                } else {
                    doneCallback(null, {
                        message: colors.red("Test failed after "+okCount+" pings"),
                        time: (new Date()).getTime() - starttime+"ms"
                    });
                }
            }
        }
    )}
}