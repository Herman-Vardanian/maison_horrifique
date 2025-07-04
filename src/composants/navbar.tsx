import React from "react";
import "./navbar.css";
import logo from "../img/logo_2.png";

type Page = "home" | "reservation" | "sessions" | "contact" | "login" | "register" | "employees";

interface NavbarProps {
  setPage: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setPage }) => {
  const stored = localStorage.getItem("user");
  const user = stored ? (JSON.parse(stored) as { username: string }) : null;
  const isAdmin = user?.username === "admin";

  return (
    <nav className="navbar">
      <img
        src={logo}
        alt="Logo"
        className="navbar-logo"
        onClick={() => setPage("home")}
        style={{ cursor: "pointer", maxWidth: "100px", maxHeight: "100px" }}
      />

      <div className="navbar-links">
        {user ? (
          <>
            <button onClick={() => setPage("reservation")}>Réservation</button>
            <button onClick={() => setPage("sessions")}>Sessions</button>
            <button onClick={() => setPage("contact")}>Contact</button>
            {isAdmin && (
              <button onClick={() => setPage("employees")}>
                Employés
              </button>
            )}
            <button
              onClick={() => {
                localStorage.removeItem("user");
                setPage("home");
              }}
            >
              Se déconnecter
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setPage("login")}>Connexion</button>
            <button onClick={() => setPage("register")}>Inscription</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
