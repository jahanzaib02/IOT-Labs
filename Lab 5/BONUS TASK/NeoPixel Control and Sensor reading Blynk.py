import BlynkLib
import network
import time
import dht
import machine, neopixel

sensor = dht.DHT11(machine.Pin(3))

neo = neopixel.NeoPixel(machine.Pin(48),1)
# Your Blynk authentication token
BLYNK_AUTH = "fpnKUpXmPguaNwoJAvsfzQ1_6MUt9vZi"

# Connect to WiFi
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect("Nayatel-2.4G", "03181070558")

while not wlan.isconnected():
    time.sleep(1)

# Initialize Blynk
blynk = BlynkLib.Blynk(BLYNK_AUTH, insecure=True)
r, g, b = 0, 0, 0
# Define a virtual pin function
@blynk.on("V0")
def v0_handler(value):
    global r
    r = int(value[0])
    update_neopixel()
@blynk.on("V1")
def v1_handler(value):
    global g
    g = int(value[0])
    update_neopixel()
@blynk.on("V2")
def v2_handler(value):
    global b
    b = int(value[0])
    update_neopixel()

def update_neopixel():
    neo[0] = (r, g, b)
    neo.write()
def send_value():
    try:
        sensor.measure()
        temp = sensor.temperature()
        humidity = sensor.humidity()
        blynk.virtual_write(3, humidity)
        blynk.virtual_write(4, temp)
    except:
        print("could not send Data")
# Main loop
while True:
    blynk.run()
    send_value()
    time.sleep(0.05)

