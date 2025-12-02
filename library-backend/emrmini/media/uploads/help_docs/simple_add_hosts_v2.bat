@echo off
:: simple_add_hosts_v2.bat - minimal ASCII version

set "DOMAIN=post.neochart.co.kr"
set "IP=115.68.114.90"
set "HOSTS=%SystemRoot%\System32\drivers\etc\hosts"

:: require admin
net session >nul 2>&1 || (echo [ERROR] Run as Administrator.& pause & exit /b 1)

:: check and add if missing
findstr /I /C:"%DOMAIN%" "%HOSTS%" >nul && (
  echo [INFO] Entry already exists.
  goto :flush
)

echo [ADD ] %IP% %DOMAIN%
>>"%HOSTS%" echo %IP% %DOMAIN%

:flush
ipconfig /flushdns >nul 2>&1
echo [DONE]
pause
