import { Outlet } from "react-router-dom";
import Nav from "./nav-component";
import FooterComponent from "./footer-component";

const Layout = ({ currentUser, setCurrentUser }) => {
  return (
    <>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
      <FooterComponent />
    </>
  );
};

export default Layout;
