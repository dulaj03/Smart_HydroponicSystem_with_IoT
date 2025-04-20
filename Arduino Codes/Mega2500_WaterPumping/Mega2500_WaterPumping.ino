// Pin configuration
const int moisturePin = A0;           // Moisture sensor analog pin
const int trigPin = 8;                // Ultrasonic sensor trigger
const int echoPin = 9;                // Ultrasonic sensor echo
const int pumpRelayPin = 6;           // Relay Channel 1 - Pump
const int valveRelayPin = 7;          // Relay Channel 2 - Valve
const int buzzerPin = 10;             // Buzzer pin

// Thresholds
const int moistureThreshold = 400;    // Adjust this as needed
const int ultrasonicThreshold = 5;    // in cm

void setup() {
  Serial.begin(9600);

  // Output pins
  pinMode(pumpRelayPin, OUTPUT);
  pinMode(valveRelayPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);

  // Ultrasonic sensor
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  // Initialize outputs to LOW (OFF)
  digitalWrite(pumpRelayPin, LOW);
  digitalWrite(valveRelayPin, LOW);
  digitalWrite(buzzerPin, LOW);
}

void loop() {
  int moistureValue = analogRead(moisturePin);
  float distance = getDistanceCM();

  Serial.print("Moisture: ");
  Serial.print(moistureValue);
  Serial.print(" | Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  bool isDry = moistureValue > moistureThreshold;
  bool isNear = distance <= ultrasonicThreshold;

  if (isDry) {
    // Dry soil -> Activate everything
    digitalWrite(pumpRelayPin, HIGH);
    digitalWrite(valveRelayPin, HIGH);
    digitalWrite(buzzerPin, HIGH);
  } else if (!isDry && isNear) {
    // Wet soil + presence near → Deactivate all
    digitalWrite(pumpRelayPin, LOW);
    digitalWrite(valveRelayPin, LOW);
    digitalWrite(buzzerPin, LOW);
  }

  delay(1000); // 1s delay between cycles
}

float getDistanceCM() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  float distance = duration * 0.034 / 2; // cm

  return distance;
}