#All topic tests for Yoda and devices

Here is listed everything you will need to run
the *basic_info_all_tests.js* file.

##What do you need
To run this file you'll need two programs and they're
[ConEmu](https://conemu.github.io/en/Downloads.html) and 
[Termite](https://www.compuphase.com/software_termite.htm)

##First run
Follow the given instructions:
1. Open location of *basic_info_all_tests.js* file(test file)
in file explorer
2. Right click and select **ConEmu here**
3. After launching ConEmu type this command 
`npm install`
4. When *npm* finishes it's job you can type in
`node basic_info_all_tests.js`. Don't forget to add flags. 
For example `node basic_info_all_tests.js -o -p -d`.
This command launches Mosca server
on which the tests are running.
5. Connect your Yoda to Ethernet and serial connection
6. Open Termite and establish serial connection to your Yoda.
7. On your Yoda press USR and RST button at the same time
8. Release RST button and keep holding USR button.
The RED led should be glowing
9. When the RED led will turn off you can release USR button
10. Head over to Termite and write command `overview`.
11. That command will list all settings
12. To establish connection between your PC and Yoda via Ethernet 
to run tests edit the **normal_mqtt_connection** line.
13. Change the **normal_mqtt_connection** to your local IP address 
by writing command `normal_mqtt_connection="Your local IP address"`
For example `normal_mqtt_connection=192.168.50.1`
14. When the IP address is configured type `restart` to apply changes
 and restart Yoda
15. Now wait for the results of tests.

###Available flags for tests
For this test we've added some flags in case you
don't want to see certain thing or you need to know more

* -o  *Run Yoda G2 tests*
* -n  *Run Yoda G3E tests*
* -p  *Disable ping tests*
* -d  *Disable devices tests*
* -v  *Enable verbose mode*

####About flags
Here you can find a  description about what flags do

#####-o (yodag2)
-o runs tests for Yoda G2 that means it will run tests on following topics
* info_target
* info_cpuload
* info_version
* info_alias
* info_mac
* info_ip
* info_memsize
* info_datetime
* info_uptime
* info_device_counter
* info_autobackup
* info_state
* info_normal_mqtt_connection
* info_backup_mqtt_connection
* info_wifi
* info_wifi_ssid
* info_wifi_password

#####-n (yodag3e)
-n runs tests for Yoda G3E that means it will run tests on following topics
* info_target
* info_cpuload
* info_version
* info_alias
* info_mac
* info_ip
* info_memsize
* info_datetime
* info_uptime
* info_device_counter
* info_autobackup
* info_state
* info_normal_mqtt_connection
* info_backup_mqtt_connection


#####-p (ping)
-p disables ping tests that means  
that the ping between PC and Yoda won't be tested

#####-d (nodevices)
-d disables devices tests that means that 
the devices won't be tested

#####-v (verbose)
-v shows all service messages and is useful
for finding errors and bugs