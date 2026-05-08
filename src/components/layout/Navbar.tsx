import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import type React from "react";
import { useAuth } from "../../context/auth/authContext";

export default function Navbar(): React.ReactElement {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    void logout().then(() => navigate("/", { replace: true }));
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200/60">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop nav actions */}
        <nav className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button variant="primary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/login?mode=signup">
                <Button variant="primary">Get Started</Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200/60 px-6 py-4 flex flex-col gap-3">
          {user ? (
            <>
              <Link to="/fields" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-center">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="primary"
                className="w-full justify-center"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-center">
                  Login
                </Button>
              </Link>
              <Link
                to="/login?mode=signup"
                onClick={() => setMobileOpen(false)}
              >
                <Button variant="primary" className="w-full justify-center">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
