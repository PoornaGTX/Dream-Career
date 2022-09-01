import React from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import { useAppContext } from "../context/appContext";
import NavLinks from "./NavLinks";
import Logo from "../components/LogoHome";

const BigSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="containt">
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
