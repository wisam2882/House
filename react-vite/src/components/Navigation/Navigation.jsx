import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import ProfileButton from "./ProfileButton";
import homeIcon from '../../images/book2.jpg'; // Import the icon
import "./Navigation.css";

function Navigation({ onHomeClick }) {
  const user = useUser(); // Get the current user object

  return (
    <nav className="navigation-container">
      <div className="nav-icon">
        <NavLink to="/" onClick={onHomeClick}>
          <img src={homeIcon} alt="Home" className="home-icon" />
        </NavLink>
      </div>
      <ul className="navigation-list">
        <li className="nav-item">
          <NavLink to="/" className="nav-button" onClick={onHomeClick}>Home</NavLink>
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