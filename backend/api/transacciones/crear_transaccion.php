<?php
include __DIR__ . '/../../config/database.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['idCuenta']) && isset($data['Clave'])) {
    $idCuenta = $data['idCuenta'];
    $Clave = $data['Clave'];
    $Fecha = date('Y-m-d'); 
    $Hora = date('H:i:s'); 

    $conn = connectDB();

    $stmt = $conn->prepare("INSERT INTO tablatransacciones (idCuenta, Fecha, Hora, Clave) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isss", $idCuenta, $Fecha, $Hora, $Clave);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Transacción creada exitosamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error al crear la transacción']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Datos incompletos']);
}
?>
