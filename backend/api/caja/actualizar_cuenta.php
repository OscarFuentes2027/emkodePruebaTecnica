<?php
include __DIR__ . '/../../config/database.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['idCuenta']) && isset($data['idClientes']) && isset($data['dinero'])) {
    $idCuenta = $data['idCuenta'];
    $idClientes = $data['idClientes'];
    $dinero = $data['dinero'];

    $conn = connectDB();

    $stmt = $conn->prepare("UPDATE cuentasahorro SET idClientes = ?, dinero = ? WHERE idCuenta = ?");
    $stmt->bind_param("iii", $idClientes, $dinero, $idCuenta);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Cuenta de ahorro actualizada exitosamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error al actualizar la cuenta de ahorro']);
    }

    // Cerrar la conexión y el statement
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Datos incompletos']);
}
?>
