import React, { useState } from "react";
import api from "../../../api/api";
import { toast } from "react-toastify";

const CreateProtectedArea = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    totalAreaKm2: "",
    lat: "",
    lng: "",
    deleteName: "", // New state for the delete input field
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post("/api/", formData);
      toast.success("Geo-Fence Created Successfully");
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/${formData.deleteName}`); // Adjust the API endpoint as needed
      toast.success("Geo-Fence Deleted Successfully");
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    window.location.reload();
  };

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={handleShow}>
        Create / Delete Geo-Fence
      </button>

      {showModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Geo-Fence</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="totalAreaKm2" className="form-label">
                      Total Area (Km²):
                    </label>
                    <input
                      type="number"
                      id="totalAreaKm2"
                      name="totalAreaKm2"
                      className="form-control"
                      value={formData.totalAreaKm2}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="lat" className="form-label">
                      Latitude:
                    </label>
                    <input
                      type="text"
                      id="lat"
                      name="lat"
                      className="form-control"
                      value={formData.lat}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="lng" className="form-label">
                      Longitude:
                    </label>
                    <input
                      type="text"
                      id="lng"
                      name="lng"
                      className="form-control"
                      value={formData.lng}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">
                      Create
                    </button>
                  </div>
                  <div>
                    <br />
                    <hr />
                    <h5 className="modal-title">Create Geo-Fence</h5>
                    <br />
                    <div>
                      <input
                        type="text"
                        id="deleteName"
                        name="deleteName"
                        className="form-control"
                        placeholder="Enter name to delete"
                        value={formData.deleteName}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="btn btn-danger mt-2"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProtectedArea;
