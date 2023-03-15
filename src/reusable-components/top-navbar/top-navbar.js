import React    from "react";
import template from "./top-navbar.js";

class TopNavbar extends React.Component {
  render() {
    return template.call(this);
  }
}

export default TopNavbar;
