import "./App.css";
import LandingPage from "./screens/landing";
import ResearchParticipationPage from "./screens/Form";
import ResearchParticipationPageOld from "./screens/Form-old";
import Privacy from "./screens/privacy";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
            element={<ResearchParticipationPageOld />}
          />
         
          <Route
            path="/privacy-policy"
            element={<Privacy />}
          />
          {/* Optional: Add a catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
