//region imports
var EntryListener = Java.type('com.hazelcast.core.EntryListener');
//endregion

var myEntryListener = new EntryListener({
    // EntryEvent<K,V> event
    entryAdded: function (event) {
        console.log("Key: "+ event.key + " Old value: " + event.oldValue +" New value: " + event.value);
    },
    entryEvicted: function (event) {

    },

    entryRemoved: function (event) {
    },

    entryUpdated: function (event) {
    },
    // MapEvent event
    mapCleared: function (event) {
    },

    mapEvicted: function (event) {

    }
});
