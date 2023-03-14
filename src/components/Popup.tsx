import "../styles/popup.scss";

function Popup({ sweaters }) {
  return (
    <div className="popup">
      {sweaters.map((sw) => (
        <img src={sw} alt="" />
      ))}
    </div>
  );
}

export default Popup;
