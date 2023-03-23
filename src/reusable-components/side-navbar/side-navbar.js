import React    from "react";
import template from "./side-navbar.jsx";

class SideNavbar extends React.Component {
  render() {
    return template.call(this);
  }
}

export default SideNavbar;
