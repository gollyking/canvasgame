@echo off
cd %~dp0
title �򵥵�HTTP������

call browserify game.js > bundle.js

ping -n 1 127.0.0.1>nul

echo WshShell = WScript.CreateObject("WScript.Shell");> temp.js
echo WshShell.run("http://localhost");>> temp.js
cscript temp.js
del temp.js

node server.js