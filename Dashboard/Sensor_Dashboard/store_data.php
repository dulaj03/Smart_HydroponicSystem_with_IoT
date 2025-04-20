<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sensor_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sensor_id = $_POST['sensor_id'] ?? null;
    $value = $_POST['value'] ?? null;

    if ($sensor_id && is_numeric($value)) {
        $stmt = $conn->prepare("INSERT INTO sensor_data (sensor_id, value) VALUES (?, ?)");
        $stmt->bind_param("sd", $sensor_id, $value);

        if ($stmt->execute()) {
            echo json_encode(["success" => "Data stored successfully"]);
        } else {
            echo json_encode(["error" => "Failed to store data"]);
        }
        $stmt->close();
    } else {
        echo json_encode(["error" => "Invalid input data"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();
?>
