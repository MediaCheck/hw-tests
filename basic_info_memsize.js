var colors = require('colors');

/*
 TEST memsize
 */
module.exports = function (clientObj, doneCallback) {

    clientObj.verboselog(colors.yellow("Vypisuju tady nějaké to memsize info"));
    clientObj.sendMessage(clientObj.clientId, "/info_in/memsize", {}, function (payload, topic, err) {
        if (err) {
            clientObj.verboselog(colors.red("Error: ")+err.toString());
            doneCallback(err);
            return;
        }
        if (payload.status == "ok" && payload.bootloader && payload.buffer && payload.firmware) {
            clientObj.verboselog(colors.green("Hotovo šéfe"));

            if(typeof payload.bootloader != "number"){
               doneCallback(null, "Bootloader is not number");
               return;
           } else if(typeof payload.buffer != "number"){
                doneCallback(null, "Buffer is not number");
                return;
            } else if(typeof payload.firmware != "number"){
                doneCallback(null, "Firmware is not number");
                return;
            } else {

                var bootloader = payload.bootloader;
                if (bootloader == 0) {
                    bootloader = colors.red(bootloader);
                }
                var buffer = payload.buffer;
                if (buffer == 0) {
                    buffer = colors.red(buffer);
                }
                var firmware = payload.firmware;
                if (firmware == 0) {
                    firmware = colors.red(firmware);
                }

                doneCallback(null, {
                    bootloader: bootloader,
                    buffer: buffer,
                    firmware: firmware,
                });
            }


        } else {
            clientObj.verboselog(colors.red("Velký špatný tady. Dole si přečti co je chyba."));
            doneCallback("Status is not OK or bootlader/buffer/firmware is not set!");
        }
    });


}
