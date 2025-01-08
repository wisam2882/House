import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;



// import React from 'react';
// import { Link } from 'react-router-dom';

// const Header = () => {
//   return (
//     <header>
//       <h1>House of Wisdom</h1>
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/my-books">My Books</Link>
//         <Link to="/about">About</Link>
//       </nav>
//     </header>
//   );
// };

// export default Header;