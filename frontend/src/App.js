import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register.js';
import Login from './components/Login.js';
import Layout from './components/Layout.js';
import ReviewList from './components/ReviewList.js';
import ProtectedRoute from './components/ProtectedRoute.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/layout"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/review"
          element={
            <ProtectedRoute>
              <ReviewList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
