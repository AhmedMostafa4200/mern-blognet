import React from "react";

const Footer = (props) => {
  const handleOpeningMyGitHub = () => {
    window.open("https://github.com/AhmedMostafa4200");
  };
  const handleOpeningMyLinkedIn = () => {
    window.open("https://www.linkedin.com/in/ahmed-mostafa-elsayed/");
  };
  return (
    <React.Fragment>
      <nav
        className="navbar mt-1 navbar-light fixed-bottom"
        style={{ backgroundColor: "#252525" }}
      >
        <span className="navbar-brand mb-0 h1 text-light">copyRight</span>
        <span className="navbar-brand mb-0 h3 text-light">
          Ahmed Mostafa Elsayed
        </span>
        <div className="text-light">
          <i
            style={{ cursor: "pointer" }}
            onClick={handleOpeningMyGitHub}
            className="fab fa-github"
          ></i>
          &nbsp;&nbsp;
          <i
            style={{ cursor: "pointer" }}
            onClick={handleOpeningMyLinkedIn}
            className="fab fa-linkedin-in"
          ></i>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Footer;
