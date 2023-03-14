import "../styles/popup.scss";
//@ts-ignore
function Popup({ sweaters }) {
  return (
    <div className="popup">
      {sweaters.map((sw :any ) => (
        <img src={sw} alt="" />
      ))}
    </div>
  );
}

export default Popup;
