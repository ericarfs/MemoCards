import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import SignedIn from "./components/SignedIn";
import NewCard from "./pages/NewCard";
import UpdateCard from "./pages/UpdateCard";

function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}


function App() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newcard"
          element={
            <ProtectedRoute>
              <NewCard />
              </ProtectedRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <ProtectedRoute>
              <UpdateCard />
            </ProtectedRoute>
          }
        />
        
        <Route path="/" element={ <SignedIn><Index /></SignedIn>} />
        <Route path="/login" element={ <SignedIn><Login /></SignedIn>} />
        <Route path="/logout" element={ <Logout />}  />
        <Route path="/register" element={ <SignedIn><Register /></SignedIn>}  />
        <Route path="*" element={<NotFound />} />
      </Routes> 
    </BrowserRouter>
   
  );
}

export default App;