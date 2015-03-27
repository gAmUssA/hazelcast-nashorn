#!/usr/bin/env bash
jjs -fv -scripting src/main/javascript/hazelcastClient.js -cp $(echo build/classpath/lib/*.jar | tr ' ' ':'):build/resources/main/hazelcast.xml
