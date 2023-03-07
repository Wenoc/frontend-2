import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import akaszto from "./assets/akaszto.png";
import headerImg from "./assets/headerImage2022.png";
import Shelf from "./components/Shelf";
import Sweater from "./components/Sweater";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <header>
          <img src={headerImg} alt="" />
        </header>
        <section className="main">
          <div className="akaszto">
            <img src={akaszto} alt="" />
            <div className="sweaters">
              <Sweater url="src/assets/sweater/sweater-blue2.png" />
              <Sweater
                url="src/assets/sweater/sweater-darkgreen.png"
                ml={"78px"}
              />
              <Sweater
                url="src/assets/sweater/sweater-white2.png"
                ml={"178px"}
              />
              <Sweater
                url="src/assets/sweater/sweater-red.png"
                ml={"267px"}
                pt={"12px"}
              />
              <Sweater
                url="src/assets/sweater/sweater-lightgreen.png"
                ml={"350px"}
                pt={"12px"}
              />
              <Sweater
                url="src/assets/sweater/sweater-white.png"
                ml={"454px"}
              />
              <Sweater
                url="src/assets/sweater/sweater-beige.png"
                ml={"540px"}
                pt={"16px"}
              />
              <Sweater
                url="src/assets/sweater/sweater-green.png"
                ml={"630px"}
                pt={"6px"}
              />
              <Sweater
                url="src/assets/sweater/sweater-maroon.png"
                ml={"724px"}
                pt={"0px"}
              />
              <Sweater
                url="src/assets/sweater/sweater-green2.png"
                ml={"808px"}
                pt={"14px"}
              />
              <Sweater
                url="src/assets/sweater/sweater-blue.png"
                ml={"898px"}
                pt={"16px"}
              />
              <Sweater
                url="src/assets/sweater/sweater-lightblue.png"
                ml={"997px"}
                pt={"16px"}
              />
            </div>
          </div>
          <div className="shelves">
            <Shelf />
            <Shelf />
            <Shelf />
            <Shelf />
          </div>
        </section>
      </div>
    </DndProvider>
  );
}

export default App;
