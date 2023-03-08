
import "../styles/sweater.scss";

function Sweater(props: any) {

  const url = props.url;
  const ml = props.ml;
  const pt = props.pt;

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', url);
  };

  return (
    <div
      className="sweater-container"
      style={{
        marginLeft: ml,
        paddingTop: pt,
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
