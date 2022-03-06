#!/bin/bash

npm i
npm run build
cp -r dist/* /var/www/ws-chat/
