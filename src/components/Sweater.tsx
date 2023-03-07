import "../styles/sweater.scss";

function Sweater(props: any) {
  const url = props.url;
  const ml = props.ml;
  const pt = props.pt;
  return (
    <div
      className="sweater-container"
      style={{
        marginLeft: ml,
        paddingTop: pt,
      }}
    >
      <div className="sweater">
        <img src={url} alt="" height={"100px"} />
      </div>
    </div>
  );
}

export default Sweater;
