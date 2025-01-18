import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todos from "./pages/Todos";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import PageNotFound from "./pages/PageNotFound";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
