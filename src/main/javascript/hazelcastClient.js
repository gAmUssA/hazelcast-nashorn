#!/usr/bin/env jjs -fv -scripting -cp build/classpath/lib/hazelcast-3.4.1.jar:./build/classpath/lib/hazelcast-client-3.4.1.jar

//region load
// Nashorn `console` shim
var loadAbs = function (file) {
    var str = java.nio.file.Paths.get($ENV._, '../' + file).normalize().toString();
    print("Loading from path" + str);
    load(str);
};
// supporting running both from Java and from command line
if (typeof loadFromClassPath !== 'undefined' && typeof (loadFromClassPath) === 'function') {
    loadFromClassPath('lib/noconsole.js');
    loadFromClassPath('hazelcast/map_entry_listener.js');
    loadFromClassPath('hazelcast/map_entry_processor.js');
} else {
    loadAbs('lib/noconsole.js');
    loadAbs('hazelcast/map_entry_listener.js');
    loadAbs('hazelcast/map_entry_processor.js');
}
//endregion

//region imports
var HazelcastClient = Java.type("com.hazelcast.client.HazelcastClient");
var ClientConfig = Java.type("com.hazelcast.client.config.ClientConfig");
var ArrayList = Java.type("java.util.ArrayList");
//endregion imports

var clientConfig = new ClientConfig();
var addresses = new ArrayList();
addresses.add("127.0.0.1");
var networkConfig = clientConfig.getNetworkConfig();
networkConfig.setAddresses(addresses);

var hazelcastClient = HazelcastClient.newHazelcastClient(clientConfig);

var map = hazelcastClient.getMap("default");
map.addEntryListener(myEntryListener, true);
map.put("key1", "blahhh");
//map.executeOnEntries(myEntryProcessor);
console.log(map.get("key1"));
//hazelcastClient.shutdown();
