import "../styles/sweater.scss";

function Sweater(props: any) {
  const url = props.url;
  const ml = props.ml;
  const pt = props.pt;
  const zi = props.zi;

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", url);
    event.dataTransfer.setData("id", "unfolded");
  };

  return (
    <div
      className="sweater-container"
      style={{
        marginLeft: ml,
        paddingTop: pt,
        zIndex: zi,
      }}
    >
      <div className="sweater">
        <img
          src={url}
          alt=""
          height={"100px"}
          draggable="true"
          onDragStart={handleDragStart}
        />
      </div>
    </div>
  );
}

export default Sweater;
