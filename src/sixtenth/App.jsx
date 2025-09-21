import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <div className="p-6">
        <nav className="space-x-6 text-lg font-semibold">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/profile">Profile</Link>
        </nav>

        <div className="mt-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
