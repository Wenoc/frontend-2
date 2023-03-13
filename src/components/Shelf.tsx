import { useEffect, useState } from "react";
import shelfImg from "../assets/shelf.png";
import "../styles/shelf.scss";

function Shelf(props: {
  callback: boolean;
  onData: any;
  onSelectedSweaterUrlChange: Function;
  resetSweaters: boolean;
  name: string;
  sweatersOnAkaszto: any;
  handleDragFromShelf: Function;
}) {
  const [sw_shelf, set_sw_shelf] = useState(Array);

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
    const sweatersOnAkasztoUrls = [];
    props.sweatersOnAkaszto.forEach(element => {
      sweatersOnAkasztoUrls.push(element.url)
    });

    const tempArray = sw_shelf.filter( ( el ) => !sweatersOnAkasztoUrls.includes( el ) );

    props.onSelectedSweaterUrlChange("");

    set_sw_shelf(tempArray)

  }, [props.sweatersOnAkaszto]);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("id", "folded");
    props.handleDragFromShelf(true);
  };

  return (
    <div className={"shelf"} onDragOver={enableDropping} onDrop={handleDrop} onDragEnd={() => props.handleDragFromShelf(false)}>
      <div className="foldedSweaters">
      <img src={shelfImg} alt="" draggable="false" className="shelf-img"/>
        {sw_shelf.map((sw) => (
          <img
          className="folded"
            id={String(sw)}
            onDragStart={handleDragStart}
            key={String(sw)}
            src={String(sw).replace("sweater", "folded")}
            draggable={true}
          />
        ))}
      </div>
      <p className="num">{sw_shelf.length}</p>
      <p className="alapitvany">{props.name}</p>
    </div>
  );
}

export default Shelf;
