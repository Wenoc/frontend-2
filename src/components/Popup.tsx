import "../styles/popup.scss";
//@ts-ignore
function Popup({ sweaters }) {
  return (
    <div className="popup">
      {sweaters.map((sw :any ) => (
        <img key={sw} src={sw} alt="" />
      ))}
    </div>
  );
}

export default Popup;
