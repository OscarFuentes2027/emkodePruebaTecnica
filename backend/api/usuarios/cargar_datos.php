<?php
include __DIR__ . '/../../config/database.php';
$request = explode('/', trim($_SERVER['PATH_INFO'], '/')); 
$id = $request[1] ?? null;

$conn = connectDB(); 


$query = $conn->prepare("SELECT * FROM idcliente WHERE idClientes = ?");
$query->bind_param("i", $id);
$query->execute();
$result = $query->get_result();

$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row; 
}

echo json_encode(['status' => 'success', 'data' => $rows]); 

$conn->close(); 
?>
