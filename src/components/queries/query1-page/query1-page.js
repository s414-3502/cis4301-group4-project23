import React    from "react";
import Template from "./query1-page.jsx";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


class Query1page extends React.Component {
  render() {
    return Template.call(this);
  }

}

export default Query1page;
