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
  const [lengthmm, setLengthmm] = useState("");
  const [heightmm, setHeightmm] = useState("");
  const [lengthpix, setLengthpix] = useState("");
  const [heightpix, setHeightpix] = useState("");
  const [photosites, setPhotosites] = useState("");
  const [megapixels, setMegapixels] = useState("");
  const [cadence, setCadence] = useState("0");
  const [dynamic, setDynamic] = useState("0");
  const [bits, setBits] = useState("0");
  const [readNoise, setReadNoise] = useState("0");
  const [darkCurrent, setDarkCurrent] = useState("0");
  const [readTime, setReadTime] = useState("0");
  const [capacity, setCapacity] = useState("0");
  const [cooler, setCooler] = useState("0");

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
          megapixels,
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
          setLengthmm("");
          setHeightmm("");
          setLengthpix("");
          setHeightpix("");
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

          navigate("/tools");
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
        <label htmlFor="cam-marque">Marque :</label>
        <input
          type="text"
          name="cam-marque"
          placeholder="Marque"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <label htmlFor="cam-modele">Modèle :</label>
        <input
          type="text"
          placeholder="modèle"
          name="cam-modele"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <label htmlFor="cam-capteur">Capteur :</label>
        <input
          type="text"
          placeholder="Capteur"
          name="cam-capteur"
          value={sensor}
          onChange={(e) => setSensor(e.target.value)}
        />
        <label htmlFor="cam-type">Type de capteur :</label>
        <input
          type="text"
          placeholder="Type de capteur"
          name="cam-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="cam-lengthmm">largeur en mm :</label>
        <input
          type="text"
          placeholder="Largeur du capteur en MM"
          name="cam-lengthmm"
          value={lengthmm}
          onChange={(e) => setLengthmm(e.target.value)}
        />
        <label htmlFor="cam-heightmm">Hauteur du capteur en MM :</label>
        <input
          type="text"
          placeholder="Hauteur du capteur en MM"
          name="cam-heightmm"
          value={heightmm}
          onChange={(e) => setHeightmm(e.target.value)}
        />
        <label htmlFor="cam-lengthpix">largeur du capteur en pixel :</label>
        <input
          type="text"
          placeholder="Largeur du capteur en pixel"
          name="cam-lengthpix"
          value={lengthpix}
          onChange={(e) => setLengthpix(e.target.value)}
        />
        <label htmlFor="cam-heightpix">hauteur du capteur en pixel :</label>
        <input
          type="text"
          placeholder="Hauteur du capteur en pixel"
          name="cam-heightpix"
          value={heightpix}
          onChange={(e) => setHeightpix(e.target.value)}
        />
        <label htmlFor="cam-photosites">Photosites :</label>
        <input
          type="text"
          placeholder="Photosites"
          name="cam-photosites"
          value={photosites}
          onChange={(e) => setPhotosites(e.target.value)}
        />
        <label htmlFor="cam-megapixels">Megapixels :</label>
        <input
          type="text"
          placeholder="Megapixels"
          name="cam-megapixels"
          value={megapixels}
          onChange={(e) => setMegapixels(e.target.value)}
        />
        <label htmlFor="cam-cadence">Cadence :</label>
        <input
          type="text"
          placeholder="Cadence"
          name="cam-cadence"
          value={cadence}
          onChange={(e) => setCadence(e.target.value)}
        />
        <label htmlFor="cam-dynamique">Dynamique :</label>
        <input
          type="text"
          placeholder="Dynamique"
          name="cam-dynamique"
          value={dynamic}
          onChange={(e) => setDynamic(e.target.value)}
        />
        <label htmlFor="cam-bits">Bits :</label>
        <input
          type="text"
          placeholder="Bits"
          name="cam-bits"
          value={bits}
          onChange={(e) => setBits(e.target.value)}
        />
        <label htmlFor="cam-bruitLecture">Bruit de lecture :</label>
        <input
          type="text"
          placeholder="Bruit de lecture"
          name="cam-bruitLecture"
          value={readNoise}
          onChange={(e) => setReadNoise(e.target.value)}
        />
        <label htmlFor="cam-courantObscurite">Courant d'obscurité :</label>
        <input
          type="text"
          placeholder="Courant d'obscurité"
          name="cam-courantObscurite"
          value={darkCurrent}
          onChange={(e) => setDarkCurrent(e.target.value)}
        />
        <label htmlFor="cam-tempsLecture">Temps de lecture :</label>
        <input
          type="text"
          placeholder="Temps de lecture"
          name="cam-tempsLecture"
          value={readTime}
          onChange={(e) => setReadTime(e.target.value)}
        />
        <label htmlFor="cam-capacite">Capacité des pixels :</label>
        <input
          type="text"
          placeholder="Capacité des pixels"
          name="cam-capacite"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <label htmlFor="cam-cooler">Refroidissement :</label>
        <input
          type="text"
          placeholder="Refroidissement"
          name="cam-cooler"
          value={cooler}
          onChange={(e) => setCooler(e.target.value)}
        />

        <button type="submit" onClick={createNewCamera}>
          Ajouter cet camera
        </button>
        <button type="submit" onClick={() => navigate("/tools")}>
          Retour à la page admin
        </button>
      </form>
    </div>
  );
}
