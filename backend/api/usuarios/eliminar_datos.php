<?php
include __DIR__ . '/../../config/database.php';


$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['idClientes'])) {
    $idClientes = $data['idClientes'];

    $conn = connectDB();

    $stmt = $conn->prepare("DELETE FROM idcliente WHERE idClientes = ?");
    $stmt->bind_param("i", $idClientes);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Usuario eliminado exitosamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error al eliminar el usuario']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Datos incompletos']);
}

?>
