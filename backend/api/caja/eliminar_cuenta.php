<?php
include __DIR__ . '/../../config/database.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['idCuenta'])) {
    $idCuenta = $data['idCuenta'];

    $conn = connectDB();

    $stmt = $conn->prepare("DELETE FROM cuentasahorro WHERE idCuenta = ?");
    $stmt->bind_param("i", $idCuenta);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Cuenta de ahorro eliminada exitosamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error al eliminar la cuenta de ahorro']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Datos incompletos']);
}
?>
