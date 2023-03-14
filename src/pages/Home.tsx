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

import sB from "../assets/sweater/sweater-beige.png"
import sBlue from "../assets/sweater/sweater-blue.png"
import sBlue2 from "../assets/sweater/sweater-blue2.png"
import sD from "../assets/sweater/sweater-darkgreen.png"
import sG from "../assets/sweater/sweater-green.png"
import sG2 from "../assets/sweater/sweater-green2.png"
import sL from "../assets/sweater/sweater-lightblue.png"
import sLG from "../assets/sweater/sweater-lightgreen.png"
import sM from "../assets/sweater/sweater-maroon.png"
import sR from "../assets/sweater/sweater-red.png"
import sW from "../assets/sweater/sweater-white.png"
import sW2 from "../assets/sweater/sweater-white2.png"

import fB from "../assets/folded/sweater-beige.png"
import fBlue from "../assets/folded/sweater-blue.png"
import fBlue2 from "../assets/folded/sweater-blue2.png"
import fD from "../assets/folded/sweater-darkgreen.png"
import fG from "../assets/folded/sweater-green.png"
import fG2 from "../assets/folded/sweater-green2.png"
import fL from "../assets/folded/sweater-lightblue.png"
import fLG from "../assets/folded/sweater-lightgreen.png"
import fM from "../assets/folded/sweater-maroon.png"
import fR from "../assets/folded/sweater-red.png"
import fW from "../assets/folded/sweater-white.png"
import fW2 from "../assets/folded/sweater-white2.png"

function Home() {
  const [saveD, setSaveD] = useState(false);

  const [sweaters, setSweaters] = useState(sweaterData);
  const [selectedSweaterUrl, setSelectedSweaterUrl] = useState("");
  const [resetSweaters, setResetSweaters] = useState(false);
  const [callback, setCallback] = useState(false);
  const [shelfData, setShelfData] = useState([0, 0, 0, 0]);
  const [isDraggingFromShelf, SetIsDraggingFromShelf] = useState(false);

  const handleSelectedSweaterUrlChange = (newUrl: any) => {
    setSelectedSweaterUrl(newUrl);
  };

  const handleResetSweaters = () => {
    setSelectedSweaterUrl("");
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
        if (minutes >= 1) {
          localStorage.setItem("lastSent", new Date().toString());

          try {
            const res = await axios.get("https://api.ipify.org?format=json");
            const ip = res.data.ip;
            const dataToSave = {
              time: currentTime,
              ip: ip,
              foundationData: shelfData,
            };

            await axios.post("http://165.22.23.123/save", {
              dataToSave,
            });
            console.log("Sending successful!");
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log("Sending failed!");
          alert('Meg nem telt el 1 perc')
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

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    SetIsDraggingFromShelf(false);
    if (event.dataTransfer.getData("id") === "folded") {
      const id = event.dataTransfer
        .getData("text")
        .replace("folded", "sweater")
        .slice(22);

      sweaterData.forEach((sw) => {
        if (sw.url == id) {
          setSweaters((sweaters) => [...sweaters, sw]);
        }
      });
    }
  };

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragFromShelf = (value: boolean) => {
    SetIsDraggingFromShelf(value);
  };

  return (
    <div>
      <div className="hide">
        <img src={sB} alt="" />
        <img src={sBlue} alt="" />
        <img src={sBlue2} alt="" />
        <img src={sD} alt="" />
        <img src={sG} alt="" />
        <img src={sG2} alt="" />
        <img src={sL} alt="" />
        <img src={sLG} alt="" />
        <img src={sM} alt="" />
        <img src={sR} alt="" />
        <img src={sW} alt="" />
        <img src={sW2} alt="" />
        <img src={fB} alt="" />
        <img src={fBlue} alt="" />
        <img src={fBlue2} alt="" />
        <img src={fD} alt="" />
        <img src={fG} alt="" />
        <img src={fG2} alt="" />
        <img src={fL} alt="" />
        <img src={fLG} alt="" />
        <img src={fM} alt="" />
        <img src={fR} alt="" />
        <img src={fW} alt="" />
        <img src={fW2} alt="" />
      </div>
      <header>
        <img src={headerImg} alt="" draggable="false" />
      </header>
      <section className="main">
        <div className="akaszto">
          <img className="akaszto-kep" src={akaszto} alt="" />
          <div
            onDragOver={enableDropping}
            onDrop={handleDrop}
            className={isDraggingFromShelf ? "showLayer" : "hideLayer"}
          ></div>
          {sweaters.length == 0 && (
            <button className="sendBtn" onClick={saveData}>
              Elkuldes
            </button>
          )}
          <div className="sweaters" draggable={false}>
            {sweaters.map((sweater, index) => (
              <Sweater
                key={sweater.url}
                url={sweater.url}
                ml={sweater.ml}
                pt={sweater.pt}
                zi={sweater.z}
              />
            ))}
          </div>
        </div>
        <div className="shelves">
          {foundationsData.map((foundation, index) => (
            <Shelf
              website={foundation.website}
              description={foundation.description}
              key={index}
              onSelectedSweaterUrlChange={handleSelectedSweaterUrlChange}
              sweatersOnAkaszto={sweaters}
              resetSweaters={resetSweaters}
              handleDragFromShelf={handleDragFromShelf}
              callback={callback}
              name={foundation.name}
              onData={(newData: string) =>
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
