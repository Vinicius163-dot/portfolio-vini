@echo off
echo Starting npm install...
call npm install 2>&1
echo Exit code: %ERRORLEVEL%
dir node_modules /b 2>nul | find /c /v "" 
echo Done.
