import PropTypes from "prop-types"; 

function Modal({ show, onClose, onSubmit, onDelete, formData, handleInputChange, buttonText, deleteButtonText }) {
    if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Agregar Cliente</h5>
            <button
              type="button"
              className="close btn-close"
              aria-label="Close"
              onClick={onClose} 
            ></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label>Tipo de Identificación</label>
                <input
                  type="text"
                  className="form-control"
                  name="tipoId"
                  value={formData.tipoId}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Número de Identificación</label>
                <input
                  type="text"
                  className="form-control"
                  name="numId"
                  value={formData.numId}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Razón Social</label>
                <input
                  type="text"
                  className="form-control"
                  name="razonSocial"
                  value={formData.razonSocial}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Municipio</label>
                <input
                  type="text"
                  className="form-control"
                  name="municipio"
                  value={formData.municipio}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="modal-footer modal-action">
            <button type="submit" className="btn btn-primary">
              {buttonText}
            </button>
            {deleteButtonText !== "Cancelar" && (
              <button type="button" className="btn btn-danger" onClick={onDelete}>
                {deleteButtonText}
              </button>
            )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}



Modal.propTypes = {
    show: PropTypes.bool.isRequired, 
    onClose: PropTypes.func.isRequired, 
    onSubmit: PropTypes.func.isRequired, 
    onDelete: PropTypes.func.isRequired, 
    formData: PropTypes.shape({ 
      tipoId: PropTypes.string.isRequired,
      numId: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
      apellidos: PropTypes.string,
      razonSocial: PropTypes.string,
      municipio: PropTypes.string,
    }).isRequired,
    handleInputChange: PropTypes.func.isRequired, 
    buttonText: PropTypes.string.isRequired, 
    deleteButtonText: PropTypes.string.isRequired, 
  };
  
export default Modal;
