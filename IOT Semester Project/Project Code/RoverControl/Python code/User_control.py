import asyncio
import threading
import json
import time

import cv2
from flask import Flask, render_template_string, Response
from picamera2 import Picamera2
import RPi.GPIO as GPIO
import websockets

# ========== YOUR MOTOR & SERVO CONTROL CODE ==========
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
IN1, IN2, IN3, IN4 = 17, 18, 22, 23
ENA, ENB = 6, 12
SERVO = 5

motor_pins = [IN1, IN2, IN3, IN4, ENA, ENB]
for pin in motor_pins:
    GPIO.setup(pin, GPIO.OUT)
    GPIO.output(pin, GPIO.LOW)

GPIO.setup(SERVO, GPIO.OUT)
servo_pwm = GPIO.PWM(SERVO, 50)
servo_pwm.start(0)

pwm_ENA = GPIO.PWM(ENA, 30)
pwm_ENB = GPIO.PWM(ENB, 30)
pwm_ENA.start(0)
pwm_ENB.start(0)

speed = 0
angle = 75
pwm_ENA.ChangeDutyCycle(speed)
pwm_ENB.ChangeDutyCycle(speed)

def set_servo(deg):
    global angle
    angle = deg
    duty = 2 + (deg / 18)
    servo_pwm.ChangeDutyCycle(duty)
    time.sleep(0.3)
    servo_pwm.ChangeDutyCycle(0)

def move(direction):
    if direction == 'forward':
        GPIO.output(IN1, GPIO.LOW)
        GPIO.output(IN2, GPIO.HIGH)
        GPIO.output(IN3, GPIO.LOW)
        GPIO.output(IN4, GPIO.HIGH)
    elif direction == 'backward':
        GPIO.output(IN1, GPIO.HIGH)
        GPIO.output(IN2, GPIO.LOW)
        GPIO.output(IN3, GPIO.HIGH)
        GPIO.output(IN4, GPIO.LOW)
    elif direction == 'stop':
        for pin in [IN1, IN2, IN3, IN4]:
            GPIO.output(pin, GPIO.LOW)
    else:
        print(f"Unknown direction: {direction}")

# ========== WEBSOCKET HANDLER ==========
async def handler(websocket):
    global speed, angle
    async for msg in websocket:
        try:
            data = json.loads(msg)
            msg_type = data.get('type')

            if msg_type == 'move':
                dir = data.get('dir', 'stop')
                move(dir)
            elif msg_type == 'servo':
                ang = int(data.get('angle', 85))
                set_servo(ang)
            elif msg_type == 'speed':
                speed = int(data.get('speed', speed))
                pwm_ENA.ChangeDutyCycle(speed)
                pwm_ENB.ChangeDutyCycle(speed)

            await websocket.send(json.dumps({'speed': speed, 'angle': angle}))
        except Exception as e:
            print(f"[WebSocket Error] {e}")

def start_websocket():
    async def ws_main():
        async with websockets.serve(handler, "0.0.0.0", 8765):
            print("WebSocket server running on ws://0.0.0.0:8765")
            await asyncio.Future()  # run forever

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(ws_main())


# ========== CAMERA SETUP ==========
picam2 = Picamera2()
picam2.configure(picam2.create_video_configuration(main={"size": (640, 480)}))
picam2.start()

def generate_frames():
    while True:
        frame = cv2.flip(picam2.capture_array(), -1)
        _, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

# ========== FLASK APP ==========
app = Flask(__name__)

HTML_PAGE = """
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Car Control with Camera</title>
  <style>
    body { font-family: Arial; text-align: center; background: #f0f0f0; }
    .video-box { margin: 20px auto; border: 2px solid #ccc; width: 640px; }
    .status { margin-top: 10px; font-size: 1.2em; }
    .box { display: inline-block; padding: 15px; margin: 10px; background: #eee;
           border-radius: 10px; box-shadow: 0 0 8px #bbb; }
  </style>
</head>
<body>
  <h1>ðŸš— Car Controller with Live Camera</h1>
  <div class="video-box">
    <img src="/video_feed" width="640" height="480">
  </div>
  <p>Use arrow keys to move. + / - to adjust speed.</p>
  <div class="status">
    <div class="box">Speed: <span id="speed">0</span>%</div>
    <div class="box">Steering Angle: <span id="angle">75</span>Â°</div>
  </div>

  <script>
    const socket = new WebSocket("ws://" + location.hostname + ":8765");
    const speedDisplay = document.getElementById("speed");
    const angleDisplay = document.getElementById("angle");

    let currentSpeed = 70;
    let currentAngle = 75;

    socket.onopen = () => {
      updateSpeed(currentSpeed);
      updateAngle(currentAngle);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      speedDisplay.textContent = data.speed;
      angleDisplay.textContent = data.angle;
    };

    function updateSpeed(val) {
      socket.send(JSON.stringify({ type: "speed", speed: val }));
    }

    function updateAngle(val) {
      socket.send(JSON.stringify({ type: "servo", angle: val }));
    }

    function sendMoveCommand(dir) {
      socket.send(JSON.stringify({ type: "move", dir: dir }));
    }

    document.addEventListener("keydown", function (e) {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowUp":
          sendMoveCommand("forward"); break;
        case "ArrowDown":
          sendMoveCommand("backward"); break;
        case "ArrowLeft":
          currentAngle = Math.min(115, currentAngle + 5);
          updateAngle(currentAngle); break;
        case "ArrowRight":
          currentAngle = Math.max(45, currentAngle - 5);
          updateAngle(currentAngle); break;
        case "+":
        case "=":
          currentSpeed = Math.min(100, currentSpeed + 10);
          updateSpeed(currentSpeed); break;
        case "-":
        case "_":
          currentSpeed = Math.max(0, currentSpeed - 10);
          updateSpeed(currentSpeed); break;
      }
    });

    document.addEventListener("keyup", function (e) {
      if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        sendMoveCommand("stop");
      }
    });
  </script>
</body>
</html>
"""

@app.route('/')
def index():
    return render_template_string(HTML_PAGE)

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# ========== MAIN ==========
if __name__ == '__main__':
    try:
        threading.Thread(target=start_websocket, daemon=True).start()
        app.run(host='0.0.0.0', port=8080)
    except KeyboardInterrupt:
        GPIO.cleanup()


