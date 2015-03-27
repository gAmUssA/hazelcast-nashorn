var newHazelcastInstance = Java.type('com.hazelcast.core.Hazelcast').newHazelcastInstance;
//var ConsoleApp = Java.type('com.hazelcast.console.ConsoleApp');

var hazelcast = newHazelcastInstance();
//var console = new ConsoleApp(hazelcast);
//console.start(null);
