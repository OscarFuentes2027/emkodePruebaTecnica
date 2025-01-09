import { useState, useEffect } from "react";
import "./App.css";

function CuentasAhorro() {
  const [cuentas, setCuentas] = useState([]);
  const [clientes, setClientes] = useState({});
  const [loading, setLoading] = useState(true);
  const [transferRecipient, setTransferRecipient] = useState(""); 
  const [showModal, setShowModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [formData, setFormData] = useState({
    idClientes: "",
    dinero: "",
  });
  const [selectedCuenta, setSelectedCuenta] = useState(null);
  const [lastTransaction, setLastTransaction] = useState(null);

  const fetchCuentas = async () => {
    try {
      const response = await fetch("http://localhost/backend/index.php/cuenta");
      const data = await response.json();

      if (data.status === "success") {
        setCuentas(data.data);

        const uniqueClientIds = [
          ...new Set(data.data.map((cuenta) => cuenta.idClientes)),
        ];
        await fetchClientes(uniqueClientIds);
      } else {
        console.error("Error al obtener cuentas:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await fetch(
        "http://localhost/backend/index.php/usuarios"
      );
      const data = await response.json();

      if (data.status === "success") {
        const clientMap = {};
        data.data.forEach((cliente) => {
          clientMap[
            cliente.idClientes
          ] = `${cliente.nombre} ${cliente.apellidos}`;
        });
        setClientes(clientMap);
      } else {
        console.error("Error al obtener clientes:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const fetchLastTransaction = async (idCuenta) => {
    try {
      console.log("Obteniendo transacciones para idCuenta:", idCuenta);

      const response = await fetch(
        `http://localhost/backend/index.php/transacciones/${idCuenta}`
      );
      const data = await response.json();

      if (data.status === "success" && data.data.length > 0) {
       
        const latestTransaction = data.data.reduce((latest, transaction) =>
          transaction.idTransaccion > latest.idTransaccion
            ? transaction
            : latest
        );

        console.log("Última transacción encontrada:", latestTransaction);
        setLastTransaction(latestTransaction);
      } else {
        console.log("No hay transacciones disponibles para este cliente.");
        setLastTransaction(null);
      }
    } catch (error) {
      console.error("Error al obtener la última transacción:", error);
    }
  };

  useEffect(() => {
    fetchCuentas();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateCuenta = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost/backend/index.php/cuenta",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (data.status === "success") {
        fetchCuentas(); 
        setShowModal(false);
      } else {
        console.error("Error al crear cuenta:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const openTransactionModal = (cuenta) => {
    setSelectedCuenta(cuenta);
    setLastTransaction(null); 
    fetchLastTransaction(cuenta.idCuenta); 
    setShowTransactionModal(true);
  };

  const handleTransfer = async () => {
    try {
      if (!transferRecipient) {
        alert("Seleccione un cliente receptor para la transferencia.");
        return;
      }
  
      const transferAmount = parseFloat(formData.dinero);
  
      if (transferAmount > selectedCuenta.dinero) {
        alert("Saldo insuficiente para realizar la transferencia.");
        return;
      }
  
      
      const updateSender = fetch(
        `http://localhost/backend/index.php/cuentas/${selectedCuenta.idCuenta}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dinero: selectedCuenta.dinero - transferAmount,
          }),
        }
      );
  
      
      const updateRecipient = fetch(
        `http://localhost/backend/index.php/cuentas/${transferRecipient}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dinero: clientes[transferRecipient].dinero + transferAmount, 
          }),
        }
      );
  
      
      const [senderResponse, recipientResponse] = await Promise.all([
        updateSender,
        updateRecipient,
      ]);
  
      const senderData = await senderResponse.json();
      const recipientData = await recipientResponse.json();
  
      if (senderData.status === "success" && recipientData.status === "success") {
        alert("Transferencia realizada con éxito.");
        setShowTransactionModal(false);
        fetchCuentas(); 
      } else {
        alert("Error al realizar la transferencia.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error al realizar la transferencia.");
    }
  };
  
  const openModalForCreate = () => {
    setFormData({
      idClientes: "",
      dinero: "",
    });
    setShowModal(true);
  };

  return (
    <div className="container">
      <h3>Cuentas de Ahorro</h3>
      <button className="btn btn-success" onClick={openModalForCreate}>
        Crear Cuenta
      </button>
      <div className="table-responsive mt-3">
        {loading ? (
          <p>Cargando datos...</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {cuentas.length > 0 ? (
                cuentas.map((cuenta) => (
                  <tr
                    key={cuenta.idCuenta}
                    onClick={() => openTransactionModal(cuenta)}
                  >
                    <td>{cuenta.idCuenta}</td>
                    <td>{clientes[cuenta.idClientes] || "Cargando..."}</td>
                    <td>${cuenta.dinero}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No hay cuentas disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {showTransactionModal && lastTransaction && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Última Transacción</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowTransactionModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="display-6">
                  Cliente: {clientes[selectedCuenta.idClientes]}
                </p>
                <p>
                  <strong>Fecha:</strong> {lastTransaction.Fecha}
                </p>
                <p>
                  <strong>Hora:</strong> {lastTransaction.Hora}
                </p>
                <p>
                  <strong>Clave:</strong> {lastTransaction.Clave}
                </p>
                <div className="mb-3">
                  <label htmlFor="dinero" className="form-label">
                    Cantidad a Transferir
                  </label>
                  <input
                    type="number"
                    id="dinero"
                    name="dinero"
                    className="form-control"
                    value={formData.dinero}
                    onChange={handleInputChange}
                    required
                    min="0"
                  />
                </div>

                <button
                  className="btn btn-primary"
                  onClick={handleTransfer}
                  disabled={!formData.dinero || formData.dinero <= 0}
                >
                  Transferir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Crear Cuenta</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleCreateCuenta}>
                  <div className="mb-3">
                    <label htmlFor="idClientes" className="form-label">
                      Cliente
                    </label>
                    <select
                      id="idClientes"
                      name="idClientes"
                      className="form-select"
                      value={formData.idClientes}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Seleccione un cliente</option>
                      {Object.entries(clientes).map(([id, nombre]) => (
                        <option key={id} value={id}>
                          {nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dinero" className="form-label">
                      Dinero
                    </label>
                    <input
                      type="number"
                      id="dinero"
                      name="dinero"
                      className="form-control"
                      value={formData.dinero}
                      onChange={handleInputChange}
                      required
                      min="0"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Crear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {showTransactionModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Transferencia</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowTransactionModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="display-6">
                  Cliente que transfiere: {clientes[selectedCuenta.idClientes]}
                </p>
                <p>
                  <strong>Saldo actual:</strong> ${selectedCuenta.dinero}
                </p>
                <div className="mb-3">
                  <label htmlFor="transferRecipient" className="form-label">
                    Cliente receptor
                  </label>
                  <select
                    id="transferRecipient"
                    name="transferRecipient"
                    className="form-select"
                    value={transferRecipient}
                    onChange={(e) => setTransferRecipient(e.target.value)}
                    required
                  >
                    <option value="">Seleccione un cliente</option>
                    {Object.entries(clientes)
                      .filter(
                        ([id]) => id !== selectedCuenta.idClientes.toString()
                      ) 
                      .map(([id, nombre]) => (
                        <option key={id} value={id}>
                          {nombre}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="dinero" className="form-label">
                    Cantidad a Transferir
                  </label>
                  <input
                    type="number"
                    id="dinero"
                    name="dinero"
                    className="form-control"
                    value={formData.dinero}
                    onChange={handleInputChange}
                    required
                    min="0"
                    max={selectedCuenta.dinero} 
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={handleTransfer}
                  disabled={
                    !formData.dinero ||
                    formData.dinero <= 0 ||
                    formData.dinero > selectedCuenta.dinero ||
                    !transferRecipient
                  }
                >
                  Transferir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CuentasAhorro;
