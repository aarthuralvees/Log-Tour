import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './App/Home';
import Chatbot from './App/chatbot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;