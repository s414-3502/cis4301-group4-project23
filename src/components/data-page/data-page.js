import React    from "react";
import template from "./data-page.jsx";

class DataPage extends React.Component {
  render() {
    return template.call(this);
  }
}

export default DataPage;
