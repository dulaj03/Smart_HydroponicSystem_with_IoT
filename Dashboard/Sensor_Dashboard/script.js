const espIP = 'http://192.168.153.35/sensor'; 
const historyAPI = 'get_data.php';

let chartInstance = null;
let historyChartInstance = null;
let activeSensor = 'humidity'; 
let currentHistorySensor = null;
let chartData = {
    labels: [],
    humidity: [],
    temperature: [],
    ph: [],
    Nitrogen: [],
    potassium: [],
    phosphorus: []
};

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
    setupHistoryButtons();
    setupChartToggle();
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem("darkMode", document.body.classList.contains('dark-mode') ? "enabled" : "disabled");

    if (chartInstance) chartInstance.update();
    if (historyChartInstance) historyChartInstance.update();
}

function setupHistoryButtons() {
    document.querySelectorAll('.history-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            currentHistorySensor = this.dataset.sensor;
            document.getElementById('timeRangeSelector').style.display = 'block';
            document.getElementById('chartBox').style.display = 'none';
            if (chartInstance) {
                chartInstance.destroy();
                chartInstance = null;
            }
        });
    });
    
    document.getElementById('fetchHistory').addEventListener('click', fetchHistoricalData);
    document.getElementById('closeHistory').addEventListener('click', closeHistoryView);
}

function setupChartToggle() {
    document.querySelectorAll('.data-box').forEach(box => {
        box.addEventListener('click', function() {
            document.querySelectorAll('.data-box').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            showChart(this.dataset.sensor);
            document.getElementById('historyChartBox').style.display = 'none';
            if (historyChartInstance) {
                historyChartInstance.destroy();
                historyChartInstance = null;
            }
        });
    });
}

function closeHistoryView() {
    document.getElementById('timeRangeSelector').style.display = 'none';
    document.getElementById('historyChartBox').style.display = 'none';
    if (historyChartInstance) {
        historyChartInstance.destroy();
        historyChartInstance = null;
    }
}

setInterval(fetchSensorData, 5000);
fetchSensorData();

async function fetchSensorData() {
    try {
        const response = await fetch(espIP);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        const data = await response.json();
        let now = new Date().toLocaleTimeString();

        if (chartData.labels.length >= 10) {
            chartData.labels.shift();
            Object.keys(chartData).forEach(key => key !== "labels" && chartData[key].shift());
        }

        chartData.labels.push(now);
        Object.keys(data).forEach(key => chartData[key]?.push(data[key]));

        updateSensorUI(data);
        updateGauges(data);
        updateLiveChart();
        await storeSensorData(data);

        checkAlerts(data, now);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}
async function storeSensorData(data) {
    try {
        const response = await fetch('store_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), 
        });

        if (!response.ok) {
            throw new Error(`Error storing data: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error storing data:', error.message);
    }
}

async function fetchHistoricalData() {
    const timeRange = document.getElementById('timeRange').value;
    try {
        const response = await fetch(`${historyAPI}?sensor=${currentHistorySensor}&hours=${timeRange}`);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        
        drawHistoryChart(data);
    } catch (error) {
        console.error('Error fetching historical data:', error);
        alert('Failed to fetch historical data. Please try again.');
    }
}

function drawHistoryChart(data) {
    const ctx = document.getElementById('historyChart').getContext('2d');

    if (historyChartInstance) historyChartInstance.destroy();
    
 
    const sensorColors = {
        humidity: 'rgba(0, 123, 255, 0.6)',
        temperature: 'rgba(255, 99, 132, 0.6)',
        ph: 'rgba(54, 162, 235, 0.6)',
        Nitrogen: 'rgba(255, 206, 86, 0.6)',
        potassium: 'rgba(75, 192, 192, 0.6)',
        phosphorus: 'rgba(153, 102, 255, 0.6)'
    };
    
    historyChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(item => new Date(item.timestamp).toLocaleString()),
            datasets: [{
                label: currentHistorySensor.toUpperCase(),
                data: data.map(item => item.value),
                borderColor: sensorColors[currentHistorySensor],
                backgroundColor: sensorColors[currentHistorySensor].replace('0.6', '0.2'),
                fill: true,
                tension: 0.1,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `${currentHistorySensor.toUpperCase()} History`,
                    font: { size: 16 },
                    color: document.body.classList.contains('dark-mode') ? '#eee' : '#666'
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: { 
                        display: true, 
                        text: 'Time',
                        color: document.body.classList.contains('dark-mode') ? '#eee' : '#666'
                    },
                    ticks: {
                        color: document.body.classList.contains('dark-mode') ? '#eee' : '#666',
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: {
                        color: document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    }
                },
                y: {
                    title: { 
                        display: true, 
                        text: 'Value',
                        color: document.body.classList.contains('dark-mode') ? '#eee' : '#666'
                    },
                    ticks: {
                        color: document.body.classList.contains('dark-mode') ? '#eee' : '#666'
                    },
                    grid: {
                        color: document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
    
    document.getElementById('historyChartBox').style.display = 'block';
}

function updateSensorUI(data) {
    Object.keys(data).forEach(key => {
        let element = document.getElementById(`value-${key}`);
        if (element) element.textContent = formatSensorValue(key, data[key]);
    });
}
function formatSensorValue(sensor, value) {
    const units = {
        humidity: "%",
        temperature: "°C",
        Nitrogen: " mg/L",
        potassium: " mg/L",
        phosphorus: " mg/L"
    };
    return value + (units[sensor] || "");
}

function updateGauges(data) {
    document.querySelectorAll(".gauge .fill").forEach(gauge => {
        const sensor = gauge.parentElement.parentElement.dataset.sensor;
        if (data[sensor] !== undefined) {
            let value = Math.min(Math.max(data[sensor], 0), 100); // Clamp between 0-100
            gauge.style.transform = `scaleY(${value/100})`;
        }
    });
}

function showChart(sensorType) {
    activeSensor = sensorType;
    document.getElementById('chartBox').style.display = 'block';
    drawChart();
}

function drawChart() {
    const ctx = document.getElementById('sensorChart').getContext('2d');

    if (chartInstance) chartInstance.destroy();

    const sensorColors = {
        humidity: 'rgba(0, 123, 255, 0.6)',
        temperature: 'rgba(255, 99, 132, 0.6)',
        ph: 'rgba(54, 162, 235, 0.6)',
        Nitrogen: 'rgba(255, 206, 86, 0.6)',
        potassium: 'rgba(75, 192, 192, 0.6)',
        phosphorus: 'rgba(153, 102, 255, 0.6)'
    };

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: activeSensor.toUpperCase(),
                data: chartData[activeSensor],
                borderColor: sensorColors[activeSensor],
                backgroundColor: sensorColors[activeSensor].replace('0.6', '0.2'),
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `${activeSensor.toUpperCase()} Live Data`,
                    font: { size: 16 },
                    color: document.body.classList.contains('dark-mode') ? '#eee' : '#666'
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: document.body.classList.contains('dark-mode') ? '#eee' : '#666'
                    },
                    grid: {
                        color: document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: document.body.classList.contains('dark-mode') ? '#eee' : '#666'
                    },
                    grid: {
                        color: document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
}

function updateLiveChart() {
    if (chartInstance) {
        chartInstance.data.labels = chartData.labels;
        chartInstance.data.datasets[0].data = chartData[activeSensor];
        chartInstance.update();
    }
}

function checkAlerts(data, time) {
    let alertTable = document.getElementById("alertTableBody");
    let existingAlerts = new Set([...alertTable.rows].map(row => row.cells[1].textContent));
    let alerts = [];

    if (data.humidity > 80 && !existingAlerts.has("Humidity")) alerts.push({ sensor: "Humidity", value: `${data.humidity}%`, message: "Too High!" });
    if (data.temperature > 35 && !existingAlerts.has("Temperature")) alerts.push({ sensor: "Temperature", value: `${data.temperature}°C`, message: "Overheating!" });
    if ((data.ph < 5 || data.ph > 8) && !existingAlerts.has("pH Level")) alerts.push({ sensor: "pH Level", value: data.ph, message: "Unstable pH!" });
    if (data.Nitrogen > 50 && !existingAlerts.has("Nitrogen")) alerts.push({ sensor: "Nitrogen", value: `${data.Nitrogen} mg/L`, message: "High Nitrogen!" });
    if (data.potassium > 50 && !existingAlerts.has("Potassium")) alerts.push({ sensor: "Potassium", value: `${data.potassium} mg/L`, message: "High Potassium!" });
    if (data.phosphorus > 50 && !existingAlerts.has("Phosphorus")) alerts.push({ sensor: "Phosphorus", value: `${data.phosphorus} mg/L`, message: "High Phosphorus!" });

    alerts.forEach(alert => {
        let row = `<tr><td>${time}</td><td>${alert.sensor}</td><td>${alert.value}</td><td>${alert.message}</td></tr>`;
        alertTable.innerHTML += row;
    });

    if (alertTable.rows.length > 10) alertTable.deleteRow(0);
}

function clearAllAlerts() {
    document.getElementById("alertTableBody").innerHTML = "";
}

document.addEventListener("DOMContentLoaded", function() {
    let clearButton = document.getElementById("clearAllButton");
    if (clearButton) {
        clearButton.addEventListener("click", clearAllAlerts);
    }
});