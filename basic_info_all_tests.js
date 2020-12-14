"use strict";

// npm stuff
var mosca = require('mosca');
var async = require('async');
var colors = require('colors');
var program = require('commander');
// npm stuff end

// Flags
program
    .version('0.1.1')
    .option('-o, --yodag2', 'Run Yoda G2 tests')
    .option('-n, --yodag3e', 'Run Yoda G3E tests')
    .option('-p, --ping', 'Disable ping tests')
    .option('-d, --nodevices', 'Disable devices tests')
    .option('-v, --verbose', 'Enable verbose mode')
    .parse(process.argv);
//Flags end

// Mosca server
var settings = {
    port: 1881,
};

var verboselog = function (data) {
    if(program.verbose){
        console.log(colors.gray(data));
    }
}

var server = new mosca.Server(settings);
    server.on('clientConnected', function (client) {
        verboselog(colors.gray("Client connected " + client.id));
        newClient(client);
    });

    server.on('published', function (packet, client) {
        if (packet.topic.indexOf("$SYS/") === 0) {
            verboselog(colors.gray('Service message :: topic=' + packet.topic + ' payload=' + payload));
            return;
        }
        try {
            var payloadStr = packet.payload.toString('utf8');
            var payload = JSON.parse(payloadStr);
        } catch (e) {
            verboselog(colors.red("Payload parse error: " + e.toString()));
            return;
        }
        if (packet.topic && packet.topic.indexOf("_out/") > -1 && msgsCallbacks[payload.mid]) {
            verboselog(colors.gray('Zprava typu odpoved :: topic=' + packet.topic + ' payload=' + payloadStr));
            msgsCallbacks[payload.mid](payload, packet.topic);
            delete msgsCallbacks[payload.mid];
        } else if (payload.type == "report") {
            verboselog(colors.gray('Zprava typu report :: topic=' + packet.topic + ' payload=' + payloadStr));
        } else {
            verboselog(colors.gray('Odchozi nebo jina zprava :: topic=' + packet.topic + ' payload=' + payloadStr));
        }


    });

    server.on('ready', function () {
        console.log(colors.yellow('Mosca server is up and running'));
    });

    var msgsCallbacks = {};

    var lastId = 0;
    var generateId = function () {
        lastId++;
        return "id_" + lastId;
    }

    var sendMessage = function (yodaId, topic, data, callback) {
        var mid = generateId();
        msgsCallbacks[mid] = callback;
        setTimeout(function () {
            if (msgsCallbacks[mid]) {
                msgsCallbacks[mid](null, null, new Error("Timeout"));
                delete msgsCallbacks[mid];
            }
        }, 1000);
        if (!data) data = {};
        data["mid"] = mid;
        var strData = JSON.stringify(data);
        verboselog(colors.gray("Posilam do yody=" + yodaId + " topic=" + topic + " payload=" + strData));
        server.publish({
            topic: yodaId + topic,
            payload: strData,
            qos: 1,
            retain: false
        })
    }

    var sendString = function (yodaId, topic, data) {
        verboselog(colors.gray("Posilam string do yody=" + yodaId + " topic=" + topic + " payload=" + data));
        server.publish({
            topic: yodaId + topic,
            payload: data,
            qos: 1,
            retain: false
        })
    }

    var testTask = function (clientObj, testName, testFunction, param, returnObject) {
        return function (callback) {
            try {
                testFunction(clientObj, function (err, okStatus) {
                    if (err) {
                        err = {test: testName, error: err};
                    }
                    if (okStatus) {
                        okStatus = {test: testName, status: okStatus};
                    }
                    callback(err, okStatus);
                }, param, returnObject);
            } catch (e) {
                callback({test: testName, error: e});
            }
        }
    }
// Mosca server end

// Info tests for Yoda
var info_target = require("./basic_info_target");
var info_cpuload  = require("./basic_info_cpuload");
var info_version = require("./basic_info_version");
var info_alias = require("./basic_info_alias");
var info_mac = require("./basic_info_mac");
var info_ip = require("./basic_info_ip");
var info_memsize = require("./basic_info_memsize");
var info_datetime = require("./basic_info_datetime");
var info_uptime = require("./basic_info_uptime");
var info_device_counter = require("./basic_info_devicecounter");
var info_autobackup = require("./basic_info_autobackup");
var info_state = require("./basic_info_state");
var info_normal_mqtt_connection = require("./basic_info_normal_mqtt_connection");
var info_backup_mqtt_connection = require("./basic_info_backup_mqtt_connection");
var info_wifi = require("./basic_info_wifi");
var info_wifi_ssid = require("./basic_info_wifi_password");
var info_wifi_password = require("./basic_info_wifi_ssid");
var info_console = require("./basic_info_console");
var info_webview = require("./basic_info_webview");
var info_webport = require("./basic_info_webport");
var info_revision = require("./basic_info_revision");
// Info tests end

// Device get and add
var command_device_get = require("./basic_command_device_get");
var command_device_add = require("./basic_command_device_add");
// Device get and add end

// Ping test
var ping_delayed = require("./basic_command_ping_delayed");
var ping_nondelay = require("./basic_command_ping_nondelay");
// Ping test end

// Device enumeration
var device_is_enumerated = require("./device_is_enumerated");
// Device enumeration end

// Test itself
var newClient = function (client) {

    var clientObj = {
        clientId: client.id,
        sendMessage: sendMessage,
        sendString: sendString,
        verboselog: verboselog,
    }
    // Yoda test itself
    var run = function (Time) {

        var device_counter_obj = {};

        var tests = [];
        if (program.yodag2) {
            tests.push(testTask(clientObj, "target", info_target));
            tests.push(testTask(clientObj, "cpuload", info_cpuload));
            tests.push(testTask(clientObj, "version", info_version, {"component":"firmware"}));
            tests.push(testTask(clientObj, "version", info_version, {"component":"bootloader"}));
            tests.push(testTask(clientObj, "version", info_version, {"component":"backup"}));
            tests.push(testTask(clientObj, "alias", info_alias));
            tests.push(testTask(clientObj, "mac", info_mac));
            tests.push(testTask(clientObj, "ip", info_ip));
            tests.push(testTask(clientObj, "memsize",info_memsize));
            tests.push(testTask(clientObj, "datetime", info_datetime));
            tests.push(testTask(clientObj, "uptime", info_uptime));
            tests.push(testTask(clientObj, "device_counter", info_device_counter, null, device_counter_obj));
            tests.push(testTask(clientObj, "autobackup", info_autobackup));
            tests.push(testTask(clientObj, "state", info_state));
            tests.push(testTask(clientObj, "normal_mqtt_connection", info_normal_mqtt_connection));
            tests.push(testTask(clientObj, "backup_mqtt_connection", info_backup_mqtt_connection));
            tests.push(testTask(clientObj, "wifi", info_wifi));
            tests.push(testTask(clientObj, "wifi_ssid", info_wifi_ssid));
            tests.push(testTask(clientObj, "wifi_password", info_wifi_password));

            tests.push(testTask(clientObj, "console", info_console));
            tests.push(testTask(clientObj, "webview", info_webview));
            tests.push(testTask(clientObj, "webport", info_webport));
            tests.push(testTask(clientObj, "revision", info_revision));
        }

        if (program.yodag3e) {
            tests.push(testTask(clientObj, "target", info_target));
            tests.push(testTask(clientObj, "cpuload", info_cpuload));
            tests.push(testTask(clientObj, "version", info_version, {"component":"firmware"}));
            tests.push(testTask(clientObj, "version", info_version, {"component":"bootloader"}));
            tests.push(testTask(clientObj, "version", info_version, {"component":"backup"}));
            tests.push(testTask(clientObj, "alias", info_alias));
            tests.push(testTask(clientObj, "mac", info_mac));
            tests.push(testTask(clientObj, "ip", info_ip));
            tests.push(testTask(clientObj, "memsize",info_memsize));
            tests.push(testTask(clientObj, "datetime", info_datetime));
            tests.push(testTask(clientObj, "uptime", info_uptime));
            tests.push(testTask(clientObj, "device_counter", info_device_counter, null, device_counter_obj));
            tests.push(testTask(clientObj, "autobackup", info_autobackup));
            tests.push(testTask(clientObj, "state", info_state));
            tests.push(testTask(clientObj, "normal_mqtt_connection", info_normal_mqtt_connection));
            tests.push(testTask(clientObj, "backup_mqtt_connection", info_backup_mqtt_connection));
            tests.push(testTask(clientObj, "console", info_console));
            tests.push(testTask(clientObj, "webview", info_webview));
            tests.push(testTask(clientObj, "webport", info_webport));
            tests.push(testTask(clientObj, "revision", info_revision));
        }

        if (!program.ping) {
            tests.push(testTask(clientObj, "ping_delayed", ping_delayed));
            tests.push(testTask(clientObj, "ping_nondelay", ping_nondelay));
        }

        // After info Yoda test output
        async.series(tests,
            function (err, results) {
                if (err) {
                    console.log("");
                    console.log(colors.red(" = ERROR = "));
                    console.log(colors.red(" Test: "+err.test));
                    console.log(colors.red(" Error: "+err.error));
                } else {
                    console.log("");
                    console.log(colors.green(" = VSE OK = "));
                    console.log(" Test states:")
                    results.forEach(function (oneResult) {
                        var outVal = "";
                        if (typeof oneResult.status == "object") {
                            for (var key in oneResult.status) {
                                if (!oneResult.status.hasOwnProperty(key)) continue;
                                outVal += "\n     "+colors.blue(key)+colors.white(": ")+colors.green(oneResult.status[key]);
                            }
                        } else {
                            outVal = colors.red("ERROR: " + oneResult.status);
                        }
                       console.log(colors.yellow("   "+oneResult.test) + ": " + outVal);
                    });

                   // console.log(" device_counter:"+device_counter_obj["device_counter"])
                    if (!program.nodevices) {
                        runGetDeviceIds(device_counter_obj["device_counter"]);
                    }
                }
            });
        // End of output
    };
    // Test of Yoda itself end

    // Devices test
    var runGetDeviceIds = function (count) {

        var tasks = [];

        var deviceIds = {};

        for (var i = 0; i < count; i++) {
            let devId = ""+i;
            tasks.push(testTask(clientObj, "device_get", command_device_get, {"device_count":devId}, deviceIds));
            tasks.push(testTask(clientObj, "device_add", command_device_add, function () {
                return {"deviceId": deviceIds[devId]};
            }));

            // ceka. dokud neni enumerovany
            tasks.push(testTask(clientObj, "is_enumerated", device_is_enumerated, function () {
                return {"deviceId": deviceIds[devId]};
            }));

            tasks.push(testTask(clientObj, "version", info_version, function () {
                return {"deviceId": deviceIds[devId], "component":"firmware"};
            }));

            tasks.push(testTask(clientObj, "version", info_version, function () {
                return {"deviceId": deviceIds[devId], "component":"bootloader"};
            }));

            tasks.push(testTask(clientObj, "version", info_version, function () {
                return {"deviceId": deviceIds[devId], "component":"backup"};
            }));

            tasks.push(testTask(clientObj, "target", info_target, function () {
                return {"deviceId": deviceIds[devId]};
            }));
            /*
            tasks.push(testTask(clientObj, "device_add", command_device_add, function () {
                return {"deviceId": deviceIds[devId]};
            }));
            */
        }


        // After device tests output
        async.series(tasks,
            function (err, results) {
                if (err) {
                    console.log("");
                    console.log(colors.red(" = ERROR = "));
                    console.log(colors.red(" Test: "+err.test));
                    console.log(colors.red(" Error: "+err.error));
                } else {
                    console.log("");
                    console.log(colors.green(" = VSE OK = "));
                    console.log(" Test states:")
                    results.forEach(function (oneResult) {
                        var outVal = "";
                        if (typeof oneResult.status == "object") {
                            for (var key in oneResult.status) {
                                if (!oneResult.status.hasOwnProperty(key)) continue;
                                outVal += "\n     "+colors.blue(key)+colors.white(": ")+colors.green(oneResult.status[key]);
                            }
                        } else {
                            outVal = colors.red("ERROR: " + oneResult.status);
                        }
                        console.log(colors.yellow("   "+oneResult.test) + ": " + outVal);
                    });

                    console.log(" deviceIds:"+JSON.stringify(deviceIds));
                }
            });
        // End of output

    }
    // Devices test end


    setTimeout(run, 500);
}
// End of test itself