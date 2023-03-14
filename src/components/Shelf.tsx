import { useEffect, useState } from "react";
import infoIcon from "../assets/infoIcon.png";
import shelfImg from "../assets/shelf.png";
import foldedSweatherSrc from "../assets/foldedSweaterdata.json"
import "../styles/shelf.scss";
import Popup from "./Popup";

function Shelf(props: {
  callback: boolean;
  onData: any;
  onSelectedSweaterUrlChange: Function;
  resetSweaters: boolean;
  name: string;
  description: string;
  website: string;
  sweatersOnAkaszto: any;
  handleDragFromShelf: Function;
}) {
  const [sw_shelf, set_sw_shelf] = useState(Array);
  const [isHovered, SetIsHoevered] = useState(false);
  const [infoPopup, setInfoPopup] = useState(false);

console.log
  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (event.dataTransfer.getData("id") === "unfolded") {
      const id = event.dataTransfer.getData("text");
      set_sw_shelf([...sw_shelf, id]);
      props.onSelectedSweaterUrlChange(id);
    }
  };

  useEffect(() => {
    set_sw_shelf([]);
  }, [props.resetSweaters]);

  useEffect(() => {
    props.onData(sw_shelf.length);
  }, [props.callback]);

  useEffect(() => {
    // @ts-ignore
    const sweatersOnAkasztoUrls = [];
    props.sweatersOnAkaszto.forEach((element: { url: any }) => {
      sweatersOnAkasztoUrls.push(element.url);
    });

    const tempArray = sw_shelf.filter(
      // @ts-ignore
      (el) => !sweatersOnAkasztoUrls.includes(el)
    );

    props.onSelectedSweaterUrlChange("");

    set_sw_shelf(tempArray);
  }, [props.sweatersOnAkaszto]);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("id", "folded");
    props.handleDragFromShelf(true);
  };

  const closePopup = () => {
    setInfoPopup(false);
  };

  useEffect(() => {
    if (infoPopup) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [infoPopup]);
  

  return (
    <div
      className={"shelf"}
      onDragOver={enableDropping}
      onDrop={handleDrop}
      onDragEnd={() => props.handleDragFromShelf(false)}
    >
      <div className="foldedSweaters">
        <img src={shelfImg} alt="" draggable="false" className="shelf-img" />
        {sw_shelf.map((sw, index) => (
          <img
            className="folded"
            id={String(sw)}
            onDragStart={handleDragStart}
            key={String(sw)}
            src={(String(sw).replace("sweater", "folded"))}
            draggable={true}
          />
        ))}
      </div>
      <p
        className="num"
        onMouseEnter={() => SetIsHoevered(true)}
        onMouseLeave={() => SetIsHoevered(false)}
      >
        {sw_shelf.length}
      </p>
      <span>
        <span className={isHovered ? "showPopup" : "hidePopup"}>
          {sw_shelf.length != 0 && <Popup sweaters={sw_shelf} />}
        </span>
      </span>
      <p className="alapitvany">{props.name}</p>
      <div className="infoContainer">
        <div className="website">
          <span>{props.website}</span>
        </div>
        <div className="infoBtn" onClick={() => setInfoPopup(true)}>
          <img src={infoIcon} alt="" />
        </div>

        {infoPopup && (
          <div className="infoPopup">
            <div className="InfoPopupContent">
              <div className="popupClose" onClick={closePopup}>
                X
              </div>
              <h2>{props.name}</h2>
              <p>{props.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shelf;
