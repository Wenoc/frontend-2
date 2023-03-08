import { useEffect, useState } from "react";
import akaszto from "./assets/akaszto.png";
import headerImg from "./assets/headerImage2022.png";
import Shelf from "./components/Shelf";
import Sweater from "./components/Sweater";
import sweater_data from "./assets/sweater_data.json"

function App() {
  const [sw_data, setSw_data] = useState(sweater_data)
  const [data, setData] = useState("0");
  const [clear, setClear] = useState(false)

  function handleDataChange(newData: any) {
    setData(newData);
    
  }

  function handleClear(){
    setSw_data(sweater_data)
    setClear(!clear)
  }

  useEffect(() => {
    const updatedSwData = sw_data.filter((s) => s.url !== data);
    setSw_data(updatedSwData);
  }, [data]);

  return (
    <div>
      <header>
        <img src={headerImg} alt="" draggable="false" />
      </header>
      <section className="main">
        <div className="akaszto">
          <img className="akaszto-kep" src={akaszto} alt="" draggable="false" />
          <div className="sweaters">
            {sw_data.map(s => (
              <Sweater key={s.url} url={s.url} ml={s.ml} pt={s.pt}/>
            ))}
          </div>
        </div>
        <div className="shelves">
          <Shelf onDataUpdate={handleDataChange} clear={clear} />
          <Shelf onDataUpdate={handleDataChange} clear={clear} />
          <Shelf onDataUpdate={handleDataChange} clear={clear} />
          <Shelf onDataUpdate={handleDataChange} clear={clear} />
        </div>
        <div className="gomb">
          {sw_data.length != 12 &&
          <button className="clear" onClick={handleClear}>Visszaallitas</button>
          }
        </div>
      </section>
    </div>
  );
}

export default App;
