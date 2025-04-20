#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DHT.h>
#include <SoftwareSerial.h>

// Pins
#define DHTPIN 2           // D4
#define DHTTYPE DHT22
#define PH_SENSOR A0       // Shared analog pin
#define SOIL_SENSOR A0     // Shared analog pin
#define NPK_RX D5          // GPIO14
#define NPK_TX D6          // GPIO12

DHT dht(DHTPIN, DHTTYPE);
ESP8266WebServer server(80);
SoftwareSerial npkSerial(NPK_RX, NPK_TX);  // RX, TX

// WiFi Credentials
const char* ssid = "Dulaj's i13";
const char* password = "dulaj2913";

// WiFi Connection
void connectToWiFi() {
    Serial.print("Connecting to WiFi...");
    WiFi.begin(ssid, password);
    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
        if (++attempts > 20) {
            Serial.println("\n⚠ Failed to connect! Restarting ESP...");
            ESP.restart();
        }
    }
    Serial.println("\n✅ Connected to WiFi!");
    Serial.print("🌍 IP Address: ");
    Serial.println(WiFi.localIP());
}

// Read Soil Moisture (%)
int readSoilMoisture() {
    int value = analogRead(SOIL_SENSOR);
    int percentage = map(value, 1023, 0, 0, 100);  // adjust if needed
    return percentage;
}

// Read NPK Values
void readNPK(int &n, int &p, int &k) {
    // Dummy values for now
    // Replace this with actual communication code for your NPK sensor
    n = random(200, 400);
    p = random(50, 200);
    k = random(100, 300);
}

// Web server endpoint
void handleSensorRequest() {
    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature();

    int phValue = analogRead(PH_SENSOR);
    float voltage = phValue * (3.3 / 1023.0);
    float pH = 7 + ((2.5 - voltage) / 0.18);

    int soilMoisture = readSoilMoisture();
    int n, p, k;
    readNPK(n, p, k);

    String json = "{";
    json += "\"humidity\":" + String(humidity) + ",";
    json += "\"temperature\":" + String(temperature) + ",";
    json += "\"ph\":" + String(pH) + ",";
    json += "\"soil_moisture\":" + String(soilMoisture) + ",";
    json += "\"nitrogen\":" + String(n) + ",";
    json += "\"phosphorus\":" + String(p) + ",";
    json += "\"potassium\":" + String(k);
    json += "}";

    server.send(200, "application/json", json);
}

void setup() {
    Serial.begin(115200);
    npkSerial.begin(9600);  // If using actual NPK sensor with UART
    delay(1000);
    Serial.println("\n🔄 Starting ESP8266...");
    
    connectToWiFi();
    dht.begin();

    server.on("/sensor", HTTP_GET, handleSensorRequest);
    server.begin();
    Serial.println("✅ Server started! Access with /sensor");
}

void loop() {
    server.handleClient();
}