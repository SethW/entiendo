#!/bin/bash

# Get configuration
source ./env.sh

# Npm install if node_modules does not exist
[ ! -d "node_modules" ] && npm install

# Run with Meteor
meteor run --port $PORT --settings settings.json
