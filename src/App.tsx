import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import StoragePage from "./page/StoragePage";
import ItemListPage from "./page/ItemListPage";
import { useAppDispatch } from "./app/hooks";
import { getItemsAsync } from "./slice/items";
import InvoicePage from "./page/InvoicePage";
import { getInvoicesAsync } from "./slice/invoice/index";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getItemsAsync());
    dispatch(getInvoicesAsync());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path={"/"} element={<ItemListPage />} />
          <Route path={"/StoragePage"} element={<StoragePage />} />
          <Route path={"/invoicePage"} element={<InvoicePage />} />
          <Route path={"*"} element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
