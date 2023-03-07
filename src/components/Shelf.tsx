import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import shelfImg from "../assets/shelf.png";
import "../styles/shelf.scss";

function Shelf() {
  return (
    <div className={`shelf`}>
      <img src={shelfImg} alt="" />
    </div>
  );
}

export default Shelf;
