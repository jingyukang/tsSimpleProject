import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Storage from "./page/Storage";
import ItemList from "./page/ItemList/index";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path={"/"} element={<>Hello</>} />
          <Route path={"/itemlist"} element={<ItemList />} />
          <Route path={"/storage"} element={<Storage />} />
          <Route path={"/invoice"} element={<>Invoice</>} />
          <Route path={"*"} element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
