<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); 
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'], '/')); 
$resource = $request[0] ?? null; 
$subresource = $request[1] ?? null;

if ($resource === 'usuarios') {
    if ($method === 'GET') {
        if ($subresource) { 
            include 'api/usuarios/cargar_datos.php'; 
        } else { 
            include 'api/usuarios/listar_usuarios.php'; 
        }
    } elseif ($method === 'POST') {
        include 'api/usuarios/aniadir_datos.php'; // Agrega datos
    } elseif ($method === 'PUT') {
        include 'api/usuarios/actualizar_datos.php'; // Actualiza datos
    } elseif ($method === 'DELETE') {
        include 'api/usuarios/eliminar_datos.php'; // Elimina datos
    } else {
        echo json_encode(['message' => 'Método no soportado']);
    }
} elseif ($resource === 'cuenta') {
    if ($method === 'GET') {
        if ($subresource) { 
            include 'api/caja/cargar_cuentas.php'; 
        } else { 
            include 'api/caja/listar_cuentas.php'; 
        }
    } elseif ($method === 'POST') {
        include 'api/caja/crear_cuenta.php'; // Agrega datos
    } elseif ($method === 'PUT') {
        include 'api/caja/actualizar_cuenta.php'; // Actualiza datos
    } elseif ($method === 'DELETE') {
        include 'api/caja/eliminar_cuenta.php'; // Elimina datos
    } else {
        echo json_encode(['message' => 'Método no soportado']);
    }
} elseif ($resource === 'transacciones') {
    if ($method === 'GET') {
        include 'api/transacciones/cargar_transacciones.php'; // Cargar transacciones
    } elseif ($method === 'POST') {
        include 'api/transacciones/crear_transaccion.php'; // Agregar transacción
    } else {
        echo json_encode(['message' => 'Método no soportado']);
    }
} 
else {
    echo json_encode(['message' => 'Recurso no encontrado']);
}
?>
