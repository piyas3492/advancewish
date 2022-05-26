import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Publicroutes from "./Routes/Publicroutes";
import Protectedroutes from "./Utils/Protectedroutes";
import { AuthContextProvider } from "./Contexts/AuthContext";
import ProtectedRoute from "./Routes/ProtectedRoute";
function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          {Publicroutes.map((rt, key) => (
            <Route
              path={rt.path}
              exact
              element={<rt.component />}
              key={key}
            ></Route>
          ))}
          {Protectedroutes.map((rtx, keyx) => (
            <Route
              path={rtx.path}
              exact
              key={keyx}
              element={
                <ProtectedRoute>
                  <rtx.component />
                </ProtectedRoute>
              }
            />
          ))}
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}
export default App;
