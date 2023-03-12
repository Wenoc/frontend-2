import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import akaszto from "../assets/akaszto.png";
import foundationsData from "../assets/foundationsData.json";
import headerImg from "../assets/headerImage2022.png";
import sweaterData from "../assets/sweaterData.json";
import Shelf from "../components/Shelf";
import Sweater from "../components/Sweater";
import "../styles/data.scss";

function Home() {
  const [saveD, setSaveD] = useState(false);

  const [sweaters, setSweaters] = useState(sweaterData);
  const [selectedSweaterUrl, setSelectedSweaterUrl] = useState("");
  const [resetSweaters, setResetSweaters] = useState(false);
  const [callback, setCallback] = useState(false);
  const [shelfData, setShelfData] = useState([0, 0, 0, 0]);

  const handleSelectedSweaterUrlChange = (newUrl: any) => {
    setSelectedSweaterUrl(newUrl);
  };

  const handleResetSweaters = () => {
    setSweaters(sweaterData);
    setResetSweaters(!resetSweaters);
  };

  useEffect(() => {
    const updatedSweaterData = sweaters.filter(
      (sweater) => sweater.url !== selectedSweaterUrl
    );
    setSweaters(updatedSweaterData);
  }, [selectedSweaterUrl]);

  useEffect(() => {
    const fetchData = async () => {
      const lastSent = localStorage.getItem("lastSent");

      if (lastSent != null) {
        const currentTime = new Date();
        const timeDiff: number =
          currentTime.getTime() - new Date(Date.parse(lastSent)).getTime();
        const minutes = Math.floor(timeDiff / 1000 / 60);
        if (minutes >= 0) {
          localStorage.setItem("lastSent", new Date().toString());

          try {
            const res = await axios.get("https://api.ipify.org?format=json");
            const ip = res.data.ip;
            const dataToSave = {
              time: currentTime,
              ip: ip,
              foundationData: shelfData,
            };

            await axios.post("http://localhost:5000/save", {
              dataToSave,
            });
            console.log("Sending successful!");
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log("Sending failed!");
        }
      } else {
        localStorage.setItem("lastSent", new Date().toString());
      }
    };

    if (saveD == true) fetchData();
    setSaveD(false);
  }, [shelfData]);

  const saveData = () => {
    setCallback(!callback);
    setSaveD(true);
  };

  return (
    <div>
      <header>
        <img src={headerImg} alt="" draggable="false" />
      </header>
      <section className="main">
        <div className="akaszto">
          <img className="akaszto-kep" src={akaszto} alt="" draggable="false" />
          {sweaters.length == 0 && (
            <button className="sendBtn" onClick={saveData}>
              Elkuldes
            </button>
          )}
          <div className="sweaters">
            {sweaters.map((sweater) => (
              <Sweater
                key={sweater.url}
                url={sweater.url}
                ml={sweater.ml}
                pt={sweater.pt}
              />
            ))}
          </div>
        </div>
        <div className="shelves">
          {foundationsData.map((foundation, index) => (
            <Shelf
              key={index}
              onSelectedSweaterUrlChange={handleSelectedSweaterUrlChange}
              resetSweaters={resetSweaters}
              callback={callback}
              name={foundation.name}
              onData={(newData) =>
                setShelfData((prevData) => {
                  const newDataArr = [...prevData];
                  newDataArr[index] = {
                    name: foundationsData[index].name,
                    value: newData,
                  };
                  return newDataArr;
                })
              }
            />
          ))}
        </div>
        <div className="buttons">
          {sweaters.length != 12 && (
            <button className="clear" onClick={handleResetSweaters}>
              Visszaallitas
            </button>
          )}

          <Link to="/data">
            <button className="dataBtn" onClick={handleResetSweaters}>
              Adatok
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
