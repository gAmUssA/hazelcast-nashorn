#!/usr/bin/env bash
jjs -fv -scripting src/main/javascript/hazelcastMember.js -cp $(echo build/classpath/lib/*.jar | tr ' ' ':'):build/resources/main/hazelcast.xml
