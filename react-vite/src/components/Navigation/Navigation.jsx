// src/components/Navigation/Navigation.jsx
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const user = useUser(); // Get the current user object

  return (
    <nav>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className="nav-button">Home</NavLink>
        </li>
        <li>
          {user ? (
            <NavLink to={`/profile/${user.id}`} className="nav-button">My Books</NavLink>
          ) : (
            <span className="nav-button disabled">My Books</span>
          )}
        </li>
        <li>
          <div className="profile-button">
            <ProfileButton />
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;