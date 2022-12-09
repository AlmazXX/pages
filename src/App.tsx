import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Create from "./containers/Pages/Create";
import Edit from "./containers/Pages/Edit";
import Pages from "./containers/Pages/Pages";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container">
        <Routes>
          <Route path="/pages/:pageName" element={<Pages />} />
          <Route path="/pages/admin" element={<Edit/>} />
          <Route path="/pages/create" element={<Create/>} />
          <Route path="*" element={<h4>Not found!</h4>} />
        </Routes>
      </main>
    </>
  );
}

export default App;