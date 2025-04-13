import ReviewList from './components/ReviewList';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout.js';
import Register from './components/Register.js';
import Login from './components/Login.js';
function App() {
  
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/layout" element={<Layout/>}/>
      <Route path="/review" element={<ReviewList/>}/>
    </Routes>
    </Router>
  );
}

export default App;
