import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LateralNav from "./components/menu-lateral";
import PautasPage from "./pages/Pautas";
import SessaoPage from "./pages/Sessao";
import VotacaoPageView from "./pages/votacao";

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <LateralNav />

        <div className="flex-1 overflow-y-auto w-full mr-[0px] ml-[0px] sm:mr-[0px] sm:ml-[0px] px-4 lg:px-0 sm:px-4 mt-[16px]">
          <Routes>
            <Route path="/" element={<PautasPage />} />
            <Route path="/sessao" element={<SessaoPage />} />
            <Route path="/sessao/:id" element={<VotacaoPageView />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
