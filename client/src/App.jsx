import Login from "./components/Login";
import SignUp from "./components/SignUp";
import TicketList from "./components/TicketList";
import TicketData from "./components/TicketData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/ticket/:id" element={<TicketData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
