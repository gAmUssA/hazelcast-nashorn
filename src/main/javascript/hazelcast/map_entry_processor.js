//region imports
var AbstractEntryProcessor = Java.type('com.hazelcast.map.AbstractEntryProcessor');
//endregion

var myEntryProcessor = new AbstractEntryProcessor(
    //Map.Entry
    function (entry) {
        var value = entry.value;
        value = value + "_processed";
        entry.value = (value);
    }
);
