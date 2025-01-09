<?php
include __DIR__ . '/../../config/database.php';

$conn = connectDB(); 
$query = "SELECT * FROM cuentasahorro"; 
$result = $conn->query($query);

$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

echo json_encode(['status' => 'success', 'data' => $rows]);
$conn->close();
?>
