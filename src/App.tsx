import { BrowserRouter, Route, Routes } from "react-router-dom";
import Data from "./pages/Data";
import Home from "./pages/Home";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data" element={<Data />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
