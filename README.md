# 🚀 Smart Agriculture Meets Innovation: IoT-Based Automated Smart Hydroponic System 🌱⚙️☀️

## Problem Identification
Caring for plants traditionally involves lots of timely, manual work — you need to get up regularly to check soil conditions, to water, to ensure the plant receives adequate amounts of light. Additionally, traditional systems require stable power sources and cannot be deployed too far from power lines. The solution is a fully automated and self-sustained plant optimization system that:

- We check soil moisture, pH, humidity and NPK
- Uses a water pump and solenoid valve to control watering
- Mixing Nutrients ( Albert Solution ) automatically via a Mixture when the pump is ON
- Provides grow lights for artificial lighting
- Data is transmitted to a web-based Dashboard over Wi-Fi
- Runs on solar panel and battery with solar controller

## Technologies and Tools used

- Sensors :- DHT22, pH Sensor, Soil Moisture Sensor, NPK Sensor ( RS485 ), Soil Moisture and Temperature Sensor ( MTD50 ), Waterproof Ultra Sonic Sensor ( JSN-SR04T ), Light Sensor.
- Modules :- Arduino Mega 2560 board, ESP32 Wi-Fi Module, 2 channel Relay Module, Bug Converter, pH Sensor Module, NPK Sensor Module, Soil Moisture and Temperature Module, Buzzer Module.
- Hardware Components :- Water Pump Motor, Solenoid Valve, Grow Lights, Solar Panel, Solar Controller, Inverter ( to convert DC to AC ), Battery, Circuit Breakers, LCD display, Grow Lights, Nutrient Mixture and Controller, Breadboard, Jumper Wires, Electrical Wires.
- Web based Dashboard :- HTML, CSS and JS used for developed Dashboard.
- Backend :- Using PHP all the real-time data stored in a database. Database implemented using
phpMyAdmin with XAMPP server.
- Communication Protocols :- HTTP for reliable, real-time data and command exchange.
- Component Actions :- ESP32 ( HTTP request listens on PORT 80 and send back JSON data ) / Dashboard ( HTTP Get requests to ESP’s IP )

## 🔍 Why is this special?
 This system doesn’t just automate watering. It:
 ✅ Monitors pH, NPK (Nitrogen, Phosphorus, and Potassium), temperature, humidity, moisture, and water levels in real time
 ✅ Automatically irrigates only when needed, with precise nutrient mixing
 ✅ Sends data to a web dashboard for live remote access and analyzing the full plant growth with history
 ✅ Runs entirely on solar power - perfect for off-grid or eco-conscious setups
 ✅ Speeds up plant growth using grow lights for full day Photosynthesis cycle

## 🧠 Designed for:
🌿 Busy individuals who can’t check on plants daily - it does the thinking and watering for you
🧪 Educational labs to teach IoT and sustainable farming hands-on
🏭 Industrial hydroponics as a cost-effective, scalable solution - with low maintenance, high automation, and real-time analytics to maximize crop yield and minimize waste

💡 This is not just a student project - it’s a commercially viable blueprint for smart agriculture systems. Imagine running vertical farms in cities, schools, or rural areas with no grid dependency and minimal labor.
Let’s shape the future of farming - efficient, smart, and green 🌍

## Future Enhancements

1. Integration of Mobile Application
2. Cloud Logging and Data Analysis
3. SMS or Email Alerting System
4. Setting up a Camera module for Visual Monitoring
5. Automatic Nutrient Distribution
6. AI – Powered Plant health predictions
