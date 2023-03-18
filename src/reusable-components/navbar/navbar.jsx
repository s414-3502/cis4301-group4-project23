import "./navbar.css";
import React from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SideNavbar from "../side-navbar/side-navbar";

function template() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar class="topNav" position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon> 
              <SideNavbar />
            </MenuIcon>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LA Crime Data
          </Typography>
          <Button href="/" color="inherit">Home</Button>
          <Button href="/data" color="inherit">Data</Button>
          <Button href="/about" color="inherit" >About</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default template;
