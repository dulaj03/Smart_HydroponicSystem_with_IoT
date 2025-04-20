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

$sensor_id = $_GET['sensor_id'] ?? null;
$limit = $_GET['limit'] ?? 100;

if ($sensor_id) {
    $stmt = $conn->prepare("SELECT value, timestamp FROM sensor_data WHERE sensor_id = ? ORDER BY timestamp DESC LIMIT ?");
    $stmt->bind_param("si", $sensor_id, $limit);
} else {
    $stmt = $conn->prepare("SELECT sensor_id, value, timestamp FROM sensor_data ORDER BY timestamp DESC LIMIT ?");
    $stmt->bind_param("i", $limit);
}

$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($data);

$stmt->close();
$conn->close();
?>
