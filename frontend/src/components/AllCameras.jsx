/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import CurrentUserContext from "../contexts/userContext";
import userAPI from "../services/userAPI";

export default function DisplayCameras() {
  const [cameras, setCameras] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [display, setDisplay] = useState(false);
  const { user } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const getCameras = () => {
    userAPI.get("/api/cameras").then((response) => {
      setCameras(response.data[0]);
    });
  };

  const deleteCamera = (id) => {
    if (user) {
      userAPI
        .delete(`/api/cameras/${id}`)
        .then(() => {
          setCameras(
            cameras.filter((data) => {
              return data.id !== id;
            })
          );
          toast.success("Camera supprimé avec succes");
        })
        .catch((err) => {
          console.error(err);
        });
    } else toast.warning("Vous n'êtes pas connecté !");
  };

  useEffect(() => {
    getCameras();
  }, []);

  const searcher = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    if (value === "") setDisplay(false);
  };

  const handleDisplay = (e) => {
    setDisplay(true);
  };

  return (
    <div>
      <button type="submit" onClick={() => navigate("create-camera")}>
        Créer une nouvelle camera
      </button>
      <input type="text" placeholder="Rechercher" onChange={searcher} />
      <div>
        {cameras
          .filter((val) => {
            return val.model.toLowerCase().includes(searchTerm.toLowerCase());
          })
          .map((val, index) => (
            <>
              {searchTerm && (
                <button
                  type="button"
                  key={val.id}
                  value={val.id}
                  onClick={(e) => handleDisplay(e, val)}
                >
                  {val.model}
                </button>
              )}
              {display && (
                <div key={val}>
                  <h2>{val.brand}</h2>
                  <p>Modèle : {val.model}</p>
                  <p>{val.sensor}</p>
                  {val.sensor === "" || val.sensor === null ? (
                    <p />
                  ) : (
                    <p>Capteur : {val.sensor}</p>
                  )}
                  <p>Type de capteur : {val.type}</p>
                  <p>Largeur du capteur : {val.lengthmm}</p>
                  <p>Hauteur du capteur : {val.heightmm}</p>
                  <p>Largeur en pixel du capteur : {val.lengthpix}</p>
                  <p>Hauteur en pixel du capteur : {val.heightpix}</p>
                  <p>Photosites : {val.photosites}</p>
                  <p>Megapixels : {val.megapixels}</p>
                  {val.cadence === 0 || val.cadence === null ? (
                    <p />
                  ) : (
                    <p>Cadence : {val.cadence} images par seconde</p>
                  )}
                  {val.dynamic === 0 || val.dynamic === null ? (
                    <p />
                  ) : (
                    <p>Dynamique : {val.dynamic}</p>
                  )}
                  {val.bits === 0 || val.bits === null ? (
                    <p />
                  ) : (
                    <p>Bits : {val.bits}</p>
                  )}
                  {val.readNoise === 0 || val.readNoise === null ? (
                    <p />
                  ) : (
                    <p>Bruit de lecture : {val.readNoise}</p>
                  )}
                  {val.darkCurrent === 0 || val.darkCurrent === null ? (
                    <p />
                  ) : (
                    <p>Courant d'obscurité : {val.darkCurrent}</p>
                  )}
                  {val.readTime === 0 || val.readTime === null ? (
                    <p />
                  ) : (
                    <p>Temps de lecture du capteur : {val.readTime}</p>
                  )}
                  {val.capacity === 0 || val.capacity === null ? (
                    <p />
                  ) : (
                    <p>Capacité des pixels : {val.capacity}</p>
                  )}
                  {val.cooler === "" || val.cooler === null ? (
                    <p />
                  ) : (
                    <p>Refroidissement : -{val.cooler}°C</p>
                  )}
                </div>
              )}
            </>
          ))}
      </div>

      {/* {cameras.map((data) => (
        <ul key={data.id}>
          <li>
            <h2>{data.brand}</h2>
            <p>Modèle : {data.model}</p>
            {data.sensor === "" || data.sensor === null ? (
              <p />
            ) : (
              <p>Capteur : {data.sensor}</p>
            )}
            <p>Type de capteur : {data.type}</p>
            <p>Largeur du capteur : {data.lengthmm}</p>
            <p>Hauteur du capteur : {data.heightmm}</p>
            <p>Largeur en pixel du capteur : {data.lengthpix}</p>
            <p>Hauteur en pixel du capteur : {data.heightpix}</p>
            <p>Photosites :  {data.photosites}</p>
            <p>Megapixels : {data.megapixels}</p>
            {data.cadence === 0 || data.cadence === null ? (
              <p />
            ) : (
              <p>Cadence : {data.cadence} images par seconde</p>
            )}
            {data.dynamic === 0 || data.dynamic === null ? (
              <p />
            ) : (
              <p>Dynamique : {data.dynamic}</p>
            )}
            {data.bits === 0 || data.bits === null ? (
              <p />
            ) : (
              <p>Bits : {data.bits}</p>
            )}
            {data.readNoise === 0 || data.readNoise === null ? (
              <p />
            ) : (
              <p>Bruit de lecture : {data.readNoise}</p>
            )}
            {data.darkCurrent === 0 || data.darkCurrent === null ? (
              <p />
            ) : (
              <p>Courant d'obscurité : {data.darkCurrent}</p>
            )}
            {data.readTime === 0 || data.readTime === null ? (
              <p />
            ) : (
              <p>Temps de lecture du capteur : {data.readTime}</p>
            )}
            {data.capacity === 0 || data.capacity === null ? (
              <p />
            ) : (
              <p>Capacité des pixels : {data.capacity}</p>
            )}
            {data.cooler === "" || data.cooler === null ? (
              <p />
            ) : (
              <p>Refroidissement : -{data.cooler}°C</p>
            )}
            <button
              type="button"
              onClick={() => navigate(`/administration/edit-event/${data.id}`)}
            >
              Modifier la camera
            </button>
            <button type="submit" onClick={() => deleteCamera(data.id)}>
              Supprimer la camera {data.modele}
            </button>
          </li>
        </ul>
      ))} */}
    </div>
  );
}
