import { Outlet } from "react-router";

import MainNav from "../ui/MainNav";
import Footer from "../ui/Footer";

function RootLayout() {
  return (
    <>
      <MainNav />
      <Outlet />
      <Footer />
    </>
  );
}

export default RootLayout;
