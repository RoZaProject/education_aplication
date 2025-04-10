import "./App.css";
import AuthorisationForm from './components/authorisationForm/AuthorisationForm';
import HomePage from './pages/HomePage';
import LandingPage from "./pages/LandingPage";
import ResultsPage from './pages/ResultsPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/auth" element={<AuthorisationForm />}/>
        <Route path="*" element={<LandingPage />}/>
        <Route path="/result" element={<ResultsPage />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
