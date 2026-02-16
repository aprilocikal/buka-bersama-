import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Peserta from "./pages/Peserta";
import Galeri from "./pages/galeri";
import Saran from "./pages/saran";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/peserta" element={<Peserta />} />
        <Route path="/saran" element={<Saran />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
