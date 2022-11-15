import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { Login } from './Views/Login';
import { Register } from './Views/Register';
import { Home } from './Views/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="*" element={<h1>404</h1>}/>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;