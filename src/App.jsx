import "./App.css";
import LandingPage from "./screens/landing";
import ResearchParticipationPage from "./screens/Form";
import ResearchParticipationPageOld from "./screens/Form-old";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/research-participation"
            element={<ResearchParticipationPage />}
          />
          <Route
            path="/research-participation-old"
            element={<ResearchParticipationPageOld />}
          />
          {/* Optional: Add a catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
