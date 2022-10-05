import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CurrentUserContext from "../contexts/userContext";
import userAPI from "../services/userAPI";

export default function CreateCamera() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [sensor, setSensor] = useState("");
  const [type, setType] = useState("");
  const [lengthmm, setlengthmm] = useState("");
  const [heightmm, setheightmm] = useState("");
  const [lengthpix, setlengthpix] = useState("");
  const [heightpix, setheightpix] = useState("");
  const [photosites, setPhotosites] = useState("");
  const [magapixels, setMegapixels] = useState("");
  const [cadence, setCadence] = useState("");
  const [dynamic, setDynamic] = useState("");
  const [bits, setBits] = useState("");
  const [readNoise, setReadNoise] = useState("");
  const [darkCurrent, setDarkCurrent] = useState("");
  const [readTime, setReadTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const [cooler, setCooler] = useState("");

  const { user } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const createNewCamera = (e) => {
    e.preventDefault();
    if (user) {
      userAPI
        .post(`/api/cameras`, {
          brand,
          model,
          sensor,
          type,
          lengthmm,
          heightmm,
          lengthpix,
          heightpix,
          photosites,
          magapixels,
          cadence,
          dynamic,
          bits,
          readNoise,
          darkCurrent,
          readTime,
          capacity,
          cooler,
        })
        .then(() => {
          toast.success("Nouvel evenement ajouté !");
          setBrand("");
          setModel("");
          setSensor("");
          setType("");
          setlengthmm("");
          setheightmm("");
          setlengthpix("");
          setheightpix("");
          setPhotosites("");
          setMegapixels("");
          setCadence("");
          setDynamic("");
          setBits("");
          setReadNoise("");
          setDarkCurrent("");
          setReadTime("");
          setCapacity("");
          setCooler("");

          navigate("/administration");
        })
        .catch((err) => {
          console.error(err);
          toast.warning("Erreur lors de l'envoi du formulaire");
        });
    } else toast.warning("Vous n'êtes pas connecté !");
  };
  return (
    <div>
      <h1>Ajouter une camera</h1>
      <form>
        <input
          type="text"
          name="event-title"
          placeholder="Marque"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          placeholder="modèle"
          name="event-description"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <input
          type="text"
          placeholder="Capteur"
          name="event-date"
          value={sensor}
          onChange={(e) => setSensor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type de capteur"
          name="event-site"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <button type="submit" onClick={createNewCamera}>
          Ajouter cet camera
        </button>
        <button type="submit" onClick={() => navigate("/administration")}>
          Retour à la page admin
        </button>
      </form>
    </div>
  );
}
