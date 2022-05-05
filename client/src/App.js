import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/feed" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
