<?php
include __DIR__ . '/../../config/database.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['tipoId']) && isset($data['numId']) && isset($data['nombre']) && isset($data['apellidos'])&& isset($data['razonSocial']) && isset($data['municipio'])) {
    $tipoId = $data['tipoId'];
    $numId = $data['numId'];
    $nombre = $data['nombre'];
    $apellidos = $data['apellidos'];
    $razonSocial = $data['razonSocial'];
    $municipio = $data['municipio'];

    $conn = connectDB();

    $stmt = $conn->prepare("INSERT INTO idcliente (tipoId, numId, nombre, apellidos, razonSocial, municipio) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $tipoId, $numId, $nombre, $apellidos, $razonSocial, $municipio);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Usuario creado exitosamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error al crear el usuario']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Datos incompletos']);
}
?>
