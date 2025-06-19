#include <Arduino.h>
#include <DHT.h>
#include <WiFi.h>
#include <esp_heap_caps.h>

#include "tensorflow/lite/micro/micro_interpreter.h"
#include "tensorflow/lite/micro/micro_mutable_op_resolver.h"
#include "tensorflow/lite/schema/schema_generated.h"
// #include "tensorflow/lite/version.h"

#include "dht_classifier_model_data.h"  // Your converted TFLite model as a header file

#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

constexpr int kTensorArenaSize = 40 * 1024;
uint8_t* tensor_arena;

const unsigned char* model_data_ptr = nullptr;
const tflite::Model* model = nullptr;
tflite::MicroInterpreter* interpreter = nullptr;

// Optional: Human-readable class labels
const char* class_labels[5] = {"Normal", "HotHumid", "ColdDry", "HotDry", "ColdHumid"};

void setup() {
  Serial.begin(115200);
  dht.begin();

  // Allocate PSRAM for model
  model_data_ptr = (const unsigned char*)heap_caps_malloc(model_tflite_len, MALLOC_CAP_SPIRAM);
  if (!model_data_ptr) {
    Serial.println("Failed to allocate PSRAM for model!");
    while (1);
  }

  memcpy((void*)model_data_ptr, model_tflite, model_tflite_len);

  // Load model
  model = tflite::GetModel(model_data_ptr);
  // if (model->version() != TFLITE_SCHEMA_VERSION) {
  //   Serial.println("Model version mismatch!");
  //   while (1);
  // }

  // Allocate PSRAM for tensor arena
  tensor_arena = (uint8_t*)heap_caps_malloc(kTensorArenaSize, MALLOC_CAP_SPIRAM);
  if (!tensor_arena) {
    Serial.println("Failed to allocate tensor arena in PSRAM!");
    while (1);
  }

  // Use MicroMutableOpResolver and register only the required operations
  static tflite::MicroMutableOpResolver<5> resolver;
  resolver.AddFullyConnected();
  resolver.AddRelu();
  resolver.AddSoftmax();
  resolver.AddReshape();
  // resolver.AddQuantize(); // Add this if your model is quantized

  // Set up the interpreter
  static tflite::MicroInterpreter static_interpreter(model, resolver, tensor_arena, kTensorArenaSize);
  interpreter = &static_interpreter;

  if (interpreter->AllocateTensors() != kTfLiteOk) {
    Serial.println("Tensor allocation failed");
    while (1);
  }

  Serial.println("Setup complete. Starting inference...");
}

void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    delay(2000);
    return;
  }

  TfLiteTensor* input = interpreter->input(0);
  input->data.f[0] = temperature;
  input->data.f[1] = humidity;

  if (interpreter->Invoke() != kTfLiteOk) {
    Serial.println("Inference failed");
    return;
  }

  TfLiteTensor* output = interpreter->output(0);

  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print(" C, Humidity: ");
  Serial.print(humidity);
  Serial.println(" %");

  // Print all 5 class predictions
  float max_score = output->data.f[0];
  int predicted_class = 0;
  Serial.print("Predictions: ");
  for (int i = 0; i < 5; i++) {
    float score = output->data.f[i];
    Serial.print("Class ");
    Serial.print(i);
    Serial.print(" (");
    Serial.print(class_labels[i]);
    Serial.print("): ");
    Serial.print(score, 4);
    Serial.print("  ");
    if (score > max_score) {
      max_score = score;
      predicted_class = i;
    }
  }
  Serial.println();

  Serial.print("Predicted Class: ");
  Serial.print(predicted_class);
  Serial.print(" (");
  Serial.print(class_labels[predicted_class]);
  Serial.println(")");

  delay(5000);
}
