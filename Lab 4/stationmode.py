print("Hello, ESP32-S3!")

import network
import time

ssid = "TECNO SPARK 8C"
password = "safder510"

print("Connecting to WiFi", end="")
sta = network.WLAN(network.STA_IF)
sta.active(True)
sta.connect(ssid , password)

# Wait for connection
for _ in range(10):
    if sta.isconnected():
        break
    time.sleep(1)
    
    
if sta.isconnected():
    print("Connected to WiFi!")
    print("IP Address:", sta.ifconfig()[0])
else:
    print("Failed to connect")