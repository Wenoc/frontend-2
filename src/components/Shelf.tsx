import { useEffect, useState } from "react";
import shelfImg from "../assets/shelf.png";
import "../styles/shelf.scss";

function Shelf(props: any) {
  const [sw_shelf, set_sw_shelf] = useState(Array);

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");

    set_sw_shelf([...sw_shelf, id]);
    props.onDataUpdate(id);
  };

  useEffect(() => {
    set_sw_shelf([])
  }, [props.clear])


  return (
    <div className={"shelf"} onDragOver={enableDropping} onDrop={handleDrop}>
      <div className="foldedSweaters">
        {sw_shelf.map((sw) => (
          <img key={String(sw)} src={String(sw).replace("sweater", "folded")} />
        ))}
      </div>
      <img src={shelfImg} alt="" draggable="false" />
      <p className="num">{sw_shelf.length}</p>
    </div>
  );
}

export default Shelf;
