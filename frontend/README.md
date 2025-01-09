# Prueba tecnica 


## Funcionalidades Implementadas

### 1. **Listado de Clientes y Cuentas**
- Muestra un listado de los clientes registrados y sus cuentas asociadas.
- Para visualizar los datos de una cuenta específica, selecciona al cliente correspondiente.

### 2. **Crear Clientes y Cuentas**
- Desde el formulario, puedes agregar un nuevo cliente con sus datos básicos.
- También puedes asociar una cuenta nueva a un cliente ya existente.

### 3. **Actualizar o Eliminar Clientes**
- Para **actualizar** o **eliminar** un cliente, haz clic sobre el nombre del cliente en el listado principal.
  - Aparecerá un formulario para editar los datos del cliente.
  - También tendrás la opción de eliminar el cliente seleccionado.

### 4. **Transferencias entre Clientes** (No fue finalizado)
- Existe un módulo para transferir dinero entre cuentas de diferentes clientes.
- Actualmente, se puede seleccionar un cliente receptor y un monto a transferir. Sin embargo, **no se terminó de implementar la funcionalidad completa para manejar las transacciones.**

---

## Cómo Navegar por el Sistema

### Menú Desplegable
- La barra de la derecha es un **menú desplegable** que contiene todas las opciones del sistema.
- Para acceder a las funcionalidades, abre el menú y selecciona la acción que deseas realizar (crear cliente, crear cuenta, transferir, etc.).

---

## Configuración del Backend

1. **Instalación del Backend**:  
   - El backend debe ser colocado dentro de la carpeta `htdocs` del servidor XAMPP.
   - Asegúrate de que XAMPP esté corriendo y que los módulos de **Apache** y **MySQL** estén activados.

2. **Endpoint del Backend**:  
   - El sistema consume los datos desde el backend, que está configurado para responder desde rutas como:  
     `http://localhost/backend/index.php`.

3. **Base de Datos**:  
   - La base de datos se encuentra en el correo.

---

## Notas Importantes
- **Transacciones**: No se logró terminar la implementación de las transacciones, por lo que el módulo de transferencia aún no está completamente funcional.
- **Actualización y Eliminación de Clientes**: Estas acciones se realizan haciendo clic en el cliente que deseas modificar o eliminar.

