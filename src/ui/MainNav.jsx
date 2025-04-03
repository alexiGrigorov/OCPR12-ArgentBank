import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { authActions } from "../context/authSlice";

import Logo from "../assets/img/argentBankLogo.png";
import "./MainNav.css";

function MainNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.auth.status);

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {authStatus !== "succeeded" && (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
        {authStatus === "succeeded" && (
          <>
            <Link to="/user" className="main-nav-item">
              <i className="fa fa-user-circle"></i> Tony
            </Link>
            <span onClick={handleLogout} className="main-nav-item">
              <i className="fa fa-sign-out"></i> Sign Out
            </span>
          </>
        )}
      </div>
    </nav>
  );
}

export default MainNav;
