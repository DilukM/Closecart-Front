import "./App.css";
import LandingPage from "./landing";
import ResearchParticipationPage from "./Form";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/research-participation"
          element={<ResearchParticipationPage />}
        />
        {/* Optional: Add a catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
