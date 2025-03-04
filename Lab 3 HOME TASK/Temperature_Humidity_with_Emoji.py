from machine import Pin, I2C
import time
import ssd1306
import dht

sensor = dht.DHT11(Pin(3))

i2c = I2C(sda = Pin(8), scl = Pin(9))
oled = ssd1306.SSD1306_I2C(128, 64, i2c)

humidity_icon = [
  0b0000000110000000,
  0b0000001111000000,
  0b0000011111100000,
  0b0000111111110000,
  0b0001111111111000,
  0b0001111111111000,
  0b0011111111111100,
  0b0011111111111100,
  0b0111111111111110,
  0b0111111111111110,
  0b0111111111111110,
  0b0011111111111100,
  0b0011111111111100,
  0b0001111111111000,
  0b0000111111110000,
  0b0000011111100000
]

temperature_icon = [
  0b0000000010000000,
  0b0000000111000000,
  0b0000000101000000,
  0b0000000101000000,
  0b0000000101000000,
  0b0000000101000000,
  0b0000000101000000,
  0b0000000111000000,
  0b0000000111000000,
  0b0000000111000000,
  0b0000000111000000,
  0b0000000111000000,
  0b0000001111100000,
  0b0000011111110000,
  0b0000011111110000,
  0b0000001111100000
]

def DrawEmoji(icon, loc_y, loc_x):
    for x, row in enumerate(icon):
        for y in range(16):
            if row & (1 << (15-y)):
                oled.pixel(loc_y + y, loc_x + x, 1)

while True:
    try:
        sensor.measure()
        temp = sensor.temperature()
        humidity = sensor.humidity()
    except:
        print("Sensor not working")
        temp = 0
        humidity = 0
    oled.fill(0)
    DrawEmoji(humidity_icon, 0, 0)
    oled.text(f'{humidity}%', 32, 8)
    DrawEmoji(temperature_icon, 0, 32)
    oled.text(f'{temp}C', 32, 40)
    oled.show()

