import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Home } from "./pages/home";
import { About } from "./pages/about";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
