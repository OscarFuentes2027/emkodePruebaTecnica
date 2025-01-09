<?php
include __DIR__ . '/../../config/database.php';


$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['tipoId']) && isset($data['numId']) && isset($data['nombre']) && isset($data['apellidos'])&& isset($data['razonSocial']) && isset($data['municipio']) && isset($data['idClientes'])) {
    $tipoId = $data['tipoId'];
    $numId = $data['numId'];
    $nombre = $data['nombre'];
    $apellidos = $data['apellidos'];
    $razonSocial = $data['razonSocial'];
    $municipio = $data['municipio'];
    $idClientes = $data['idClientes'];

    $conn = connectDB();

    $stmt = $conn->prepare("UPDATE idcliente SET tipoId = ?, numId = ?, nombre = ?, apellidos = ?, razonSocial = ?, municipio = ? WHERE idClientes = ?");
    $stmt->bind_param("ssssssi", $tipoId, $numId, $nombre, $apellidos, $razonSocial, $municipio, $idClientes);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Usuario actualizado exitosamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error al actualizar el usuario']);
    }

    // Cerrar la conexión y el statement
    $stmt->close();
    $conn->close();
} else {
    // Devolver una respuesta JSON si faltan datos
    echo json_encode(['status' => 'error', 'message' => 'Datos incompletos']);
}
?>
