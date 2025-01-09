<?php
function connectDB() {
    $host = 'localhost';
    $user = 'root';
    $password = '';
    $dbname = 'banco_db';

    $conn = new mysqli($host, $user, $password, $dbname);

    if ($conn->connect_error) {
        die(json_encode(['status' => 'error', 'message' => 'Error de conexión']));
    }

    return $conn;
}
?>
