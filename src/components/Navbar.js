import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import "../assets/Navbar.css" ;
import { Link } from 'react-router-dom';
// import logo from "../assets/logoo.png" ;
import "bootstrap-icons/font/bootstrap-icons.css";
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className='butn' onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className='butn' onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="nav-item">
        <Link to="/profile" style={{textDecoration:"none"}}>
        <li className="nav-link" style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ marginRight: '8px' , marginBottom:0 }}>{user.email}</p>
          <img style={{ height: 30, borderRadius: '50%' , paddingRight:8 }} src={user.picture} alt={user.name} />
        </li>
        </Link>
      </div>
    )
  );
};

function Navbar() {
  const { isAuthenticated } = useAuth0();

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" style={{paddingLeft:10}} to="/">
        <i className="bi bi-stars"></i>  Dhruv
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link style={{textDecoration:"none" , color:"white"}} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link style={{textDecoration:"none" , color:"white"}} to="/upload">Upload</Link>
            </li>
          </ul>
          {isAuthenticated ? (
            <>
              <Profile />
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
