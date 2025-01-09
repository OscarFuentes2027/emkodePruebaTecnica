<?php
include __DIR__ . '/../../config/database.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['idClientes']) && isset($data['dinero'])) {
    $idClientes = $data['idClientes'];
    $dinero = $data['dinero'];

    $conn = connectDB();

    $stmt = $conn->prepare("INSERT INTO cuentasahorro ( idClientes, dinero) VALUES ( ?, ?)");
    $stmt->bind_param("ii", $idClientes, $dinero);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Cuenta de ahorro creado exitosamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error al crear la cuenta de ahorro']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Datos incompletos']);
}
?>
