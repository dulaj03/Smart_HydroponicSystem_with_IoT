# Smart Hydroponic System with IoT
This project refers to the development of a smart automatic plant watering and optimizing system based on Arduino technology. Wi-Fi module is used to send all the sensor data to a web-based dashboard for real-time monitoring and control. It marries soil-based irrigation with hydroponics to create the ideal plant growth environment. This helps with water conservation and it's great for busy or away-from- home people.

## Problem Identification
Caring for plants traditionally involves lots of timely, manual work — you need to get up regularly to check soil conditions, to water, to ensure the plant receives adequate amounts of light. Additionally, traditional systems require stable power sources and cannot be deployed too far from power lines. The solution is a fully automated and self-sustained plant optimization system that:

- We check soil moisture, pH, humidity and NPK
- Uses a water pump and solenoid valve to control watering
- Mixing Nutrients ( Albert Solution ) automatically via a Mixture when the pump is ON
- Provides grow lights for artificial lighting
- Data is transmitted to a web-based Dashboard over Wi-Fi
- Runs on solar panel and battery with solar controller
  
This smart system also supports healthy plant growth with minimal human input, emphasizes energy efficiency, and encourages sustainable agriculture.

## Technologies and Tools used

- Sensors :- DHT22, pH Sensor, Soil Moisture Sensor, NPK Sensor ( RS485 ), Soil Moisture and Temperature Sensor ( MTD50 ), Waterproof Ultra Sonic Sensor ( JSN-SR04T ), Light Sensor.
- Modules :- Arduino Mega 2560 board, ESP8266 Wi-Fi Module, 2 channel Relay Module, Bug Converter, pH Sensor Module, NPK Sensor Module, Soil Moisture and Temperature Module, Buzzer Module.
- Hardware Components :- Water Pump Motor, Solenoid Valve, Solar Panel, Solar Controller, Inverter ( to convert DC to AC ), Battery, Circuit Breakers, LCD display, Grow Lights, Nutrient Mixture and Controller, Breadboard, Jumper Wires, Electrical Wires.
- Web based Dashboard :- HTML, CSS and JS used for developed Dashboard.
- Backend :- Using PHP all the real-time data stored in a database. Database implemented using
phpMyAdmin with XAMPP server.
- Communication Protocols :- HTTP for reliable, real-time data and command exchange.
- Component Actions :- ESP8266 ( HTTP request listens on PORT 80 and send back JSON data ) / Dashboard ( HTTP Get requests to ESP’s IP )

Also, this Smart Plant Optimizing System effective for:
- Busy home gardeners who cannot nurturing to their plants daily.
- For large scale operations, handling farms where manual monitoring each plant is impractical.
- Agriculture students can use this as a learning tool, and schools and Universities also can use this as a learning tool.
- Those who aim to reduce water usage and optimize resource management can use this sustainable project as a solution.

## Future Enhancements

1. Integration of Mobile Application
2. Cloud Logging and Data Analysis
3. SMS or Email Alerting System
4. Setting up a Camera module for Visual Monitoring
5. Automatic Nutrient Distribution
6. AI – Powered Plant health predictions
