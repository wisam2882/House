// src/components/Navigation/Navigation.jsx
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const user = useUser(); // Get the current user object

  return (
    <nav className="navigation-container">
      <ul className="navigation-list">
        <li className="nav-item">
          <NavLink to="/" className="nav-button">Home</NavLink>
        </li>
        <li className="nav-item">
          {user ? (
            <NavLink to={`/profile/${user.id}`} className="nav-button">My Books</NavLink>
          ) : (
            <span className="nav-button disabled">My Books</span>
          )}
        </li>
      </ul>
      <div className="profile-container">
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;