<?php
include __DIR__ . '/../../config/database.php';

$conn = connectDB();

$request = explode('/', trim($_SERVER['PATH_INFO'], '/')); 
$idCuenta = $request[1] ?? null;

if ($idCuenta) {
    $stmt = $conn->prepare("SELECT * FROM tablatransacciones WHERE idCuenta = ?");
    $stmt->bind_param("i", $idCuenta);
} else {
    $stmt = $conn->prepare("SELECT * FROM tablatransacciones");
}

$stmt->execute();
$result = $stmt->get_result();

$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

echo json_encode(['status' => 'success', 'data' => $rows]);

$stmt->close();
$conn->close();
?>
