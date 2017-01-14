#!/bin/bash
# bash this script after you do a git pull to install the latest update

#before this can work, you will need meteor, nodejs (running as node (i.e. ubuntu, I am looking at you)), npm, and npm forever installed
#on ubuntu, you might need to run something like this $ sudo update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10

meteor build --directory ../build --server localhost:3000
cd ../build
sudo rm -rf bundle-garbage-*
cd bundle/programs/server
sudo npm install
cd ../..
forever stop main.js
METEOR_SETTINGS=$(cat ../../app/settings.json) ROOT_URL='http://entiendo.dynu.com' PORT=3000 forever start main.js
