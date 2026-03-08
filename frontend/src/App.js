import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Book";
import Cyril from "./pages/Cyril";
import Noor from "./pages/Noor";
import Ormus from "./pages/Ormus";
import NoDice from "./components/NoDice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cyril" element={<Cyril />} />
        <Route path="/Noor" element={<Noor />} />
        <Route path="/Ormus" element={<Ormus />} />
        <Route path="*" element={<NoDice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
