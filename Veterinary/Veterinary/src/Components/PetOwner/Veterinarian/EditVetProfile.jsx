import React, { useState, useEffect } from "react";
import axios from "axios";
import VetSidebar from "./VetSidebar";
import { useNavigate } from "react-router-dom";

const EditVetProfile = () => {
  const navigate = useNavigate();
  const localEmail = localStorage.getItem("email");
  const localName = localStorage.getItem("name");

  const [vetData, setVetData] = useState({
    name: localName || "",
    specialization: "",
    clinicName: "",
    contactNumber: "",
    email: localEmail || "",
    location: "",
    description: "",
    imageUrl: "",
  });

  const [saved, setSaved] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/veterinarian/vet-profile?email=${localEmail}`)
      .then((res) => {
        if (res.data) {
          setVetData(res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching vet profile:", err);
      });
  }, []);

  const handleChange = (e) => {
    setVetData({
      ...vetData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = vetData.imageUrl;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadRes = await axios.post(
          "http://localhost:8080/api/veterinarian/upload-image",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        imageUrl = uploadRes.data;
      }

      const updatedVetData = { ...vetData, imageUrl };

      await axios.post("http://localhost:8080/api/veterinarian/vet-profile", updatedVetData);

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);

      navigate("/vet-profile", { state: { updatedData: updatedVetData } });
    } catch (err) {
      console.error("Error saving vet profile:", err);
    }
  };

  return (
    <div className="d-flex min-vh-100">
      <div className="text-white p-3" style={{ width: "250px" }}>
        <VetSidebar />
      </div>

      <div className="flex-grow-1 p-4 d-flex justify-content-center align-items-start">
        <div className="card w-100" style={{ maxWidth: "800px" }}>
          <div className="card-header d-flex justify-content-between align-items-center">
            <strong>Edit Veterinarian Profile</strong>
          </div>
          <div className="card-body">
            {saved && (
              <div className="alert alert-success text-center mb-3">
                Profile saved successfully!
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="row">
                {Object.keys(vetData).map(
                  (key) =>
                    key !== "imageUrl" && (
                      <div className="mb-3 col-md-6" key={key}>
                        <label className="form-label text-capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          type="text"
                          name={key}
                          className="form-control"
                          value={vetData[key]}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )
                )}
                <div className="mb-3 col-md-6">
                  <label className="form-label">Upload Profile Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setImageFile(file);
                      if (file) {
                        setPreviewUrl(URL.createObjectURL(file));
                      }
                    }}
                  />
                </div>
                {previewUrl && (
                  <div className="mb-3 col-md-6">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="img-fluid rounded"
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                )}
              </div>
              <div className="text-center">
                <button className="btn btn-primary" type="submit">
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVetProfile;
