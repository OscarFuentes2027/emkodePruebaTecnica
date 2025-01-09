import { useState, useEffect } from "react";
import "./App.css";
import Modal from "./components/Modal";

function App() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    idClientes: "",
    tipoId: "",
    numId: "",
    nombre: "",
    apellidos: "",
    razonSocial: "",
    municipio: "",
  });
  const [selectedCliente, setSelectedCliente] = useState(null); 

  useEffect(() => {
    fetch("http://localhost/backend/index.php/usuarios")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setClientes(data.data);
        } else {
          console.error("Error al obtener datos de la API:", data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
  
    fetch("http://localhost/backend/index.php/usuarios", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), 
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          fetch("http://localhost/backend/index.php/usuarios")
            .then((response) => response.json())
            .then((data) => {
              if (data.status === "success") {
                setClientes(data.data);
                setShowModal(false); 
              } else {
                console.error("Error al recargar clientes:", data.message);
              }
            })
            .catch((error) => {
              console.error("Error al recargar clientes:", error);
            });
        } else {
          console.error("Error al crear cliente:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };
  

  const handleUpdate = (e) => {
    e.preventDefault();
  
    if (!selectedCliente || !selectedCliente.idClientes) {
      console.error("selectedCliente o idClientes no está definido.");
      return;
    }
  
    const payload = {
      ...formData, 
      idClientes: Number(selectedCliente.idClientes), 
    };
  
    fetch(`http://localhost/backend/index.php/usuarios`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), 
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          const updatedClientes = clientes.map((cliente) =>
            cliente.idClientes === selectedCliente.idClientes
              ? data.data
              : cliente
          );
          setClientes(updatedClientes);
          setShowModal(false); 
          window.location.reload();
        } else {
          console.error("Error al actualizar cliente:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };
  
  

  const handleDelete = () => {
    if (!selectedCliente || !selectedCliente.idClientes) {
      console.error("No se ha seleccionado un cliente válido.");
      return;
    }

    const payload = {
      idClientes: Number(selectedCliente.idClientes), 
    };

    fetch(`http://localhost/backend/index.php/usuarios`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), 
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setClientes(
            clientes.filter(
              (cliente) => cliente.idClientes !== selectedCliente.idClientes
            )
          );
          setShowModal(false); 
        } else {
          console.error("Error al borrar cliente:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

  const openModalForEdit = (cliente) => {
    setSelectedCliente(cliente);
    setFormData({
      tipoId: cliente.tipoId,
      numId: cliente.numId,
      nombre: cliente.nombre,
      apellidos: cliente.apellidos,
      razonSocial: cliente.razonSocial || "",
      municipio: cliente.municipio,
    });
    setShowModal(true);
  };

  const openModalForCreate = () => {
    setSelectedCliente(null);
    setFormData({
      tipoId: "",
      numId: "",
      nombre: "",
      apellidos: "",
      razonSocial: "",
      municipio: "",
    });
    setShowModal(true);
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col">
          <p className="display-1">Bienvenido, admin.</p>
          <div className="col d-flex justify-content-between mt-5">
            <h3>Clientes activos</h3>
            <button
              type="button"
              className="btn btn-success rounded-5"
              onClick={openModalForCreate} 
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="table-responsive rounded-2">
            {loading ? (
              <p>Cargando datos...</p>
            ) : (
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tipo de Identificación</th>
                    <th>Número de Identificación</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Razón Social</th>
                    <th>Municipio</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.length > 0 ? (
                    clientes.map((cliente) => (
                      <tr
                        key={cliente.idClientes}
                        onClick={() => openModalForEdit(cliente)} 
                      >
                        <td>{cliente.idClientes}</td>
                        <td>{cliente.tipoId}</td>
                        <td>{cliente.numId}</td>
                        <td>{cliente.nombre}</td>
                        <td>{cliente.apellidos}</td>
                        <td>{cliente.razonSocial || "N/A"}</td>
                        <td>{cliente.municipio}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No hay clientes disponibles
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={selectedCliente ? handleUpdate : handleCreate} 
        onDelete={handleDelete}
        formData={formData}
        handleInputChange={handleInputChange}
        buttonText={selectedCliente ? "Actualizar" : "Crear"}
        deleteButtonText={selectedCliente ? "Borrar" : "Cancelar"}
      />
    </div>
  );
}

export default App;
