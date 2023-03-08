import { useEffect, useState } from "react";
import akaszto from "./assets/akaszto.png";
import headerImg from "./assets/headerImage2022.png";
import Shelf from "./components/Shelf";
import Sweater from "./components/Sweater";
import sweater_data from "./assets/sweater_data.json";
import alapitvanyok from './assets/alapitvanyok.json'

function App() {
  const [sw_data, setSw_data] = useState(sweater_data);
  const [data, setData] = useState("0");
  const [clear, setClear] = useState(false);

  const handleDataChange = (newData: any) => {
    setData(newData);
  }

  const handleClear = () => {
    setSw_data(sweater_data);
    setClear(!clear);
  }

  useEffect(() => {
    const updatedSwData = sw_data.filter((s) => s.url !== data);
    setSw_data(updatedSwData);
  }, [data]);

  const handleSend = () => {
    const kuldve = localStorage.getItem('kuldve');

    if (kuldve != null) {
      const most = new Date();
      const diff: number = Math.abs(most.getTime() - new Date(Date.parse(kuldve)).getTime());
      const minutes = Math.floor((diff/1000)/60);

      if(minutes >= 10){
        console.log("sikeres", minutes)
        localStorage.setItem("kuldve" , new Date().toString())
      }
      else{
        console.log("sikertelen. eltelt: ", minutes)
      }
    }
    else{
      localStorage.setItem("kuldve" , new Date().toString())
    }
  }

  return (
    <div>
      <header>
        <img src={headerImg} alt="" draggable="false" />
      </header>
      <section className="main">
        <div className="akaszto">
          <img className="akaszto-kep" src={akaszto} alt="" draggable="false" />
          {sw_data.length == 0 && (
            <button className="kuldesBtn" onClick={handleSend}>Elkuldom</button>
          )}
          <div className="sweaters">
            {sw_data.map((s) => (
              <Sweater key={s.url} url={s.url} ml={s.ml} pt={s.pt} />
            ))}
          </div>
        </div>
        <div className="shelves">
          {alapitvanyok.map((alapitvany) => (
            <Shelf
              onDataUpdate={handleDataChange}
              clear={clear}
              nev={alapitvany.nev}
            />
          ))}
        </div>
        <div className="gomb">
          {sw_data.length != 12 && (
            <button className="clear" onClick={handleClear}>
              Visszaallitas
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
