/*import React    from "react";
import template from "./navbar.jsx";

class Navbar extends React.Component {
  render() {
    return template.call(this);
  }
}

export default Navbar;*/
import "./navbar.css";
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: "#aba7c6",
  color: "black",
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    backgroundColor: "#aba7c6",
    color: "black",
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar class="topNav" position="static" open={open}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LA Crime Data
          </Typography>
          <Button href="/" color="inherit">Home</Button>
          <Button href="/data" color="inherit">Data</Button>
          <Button href="/about" color="inherit" >About</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#9E97CC',
          },
        }}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <List>
            <ListItemButton href="/q1">
                <ListItemText primary={'Query 1'} />
              </ListItemButton>
              <ListItemButton href="/q2">
                <ListItemText primary={'Query 2'} />
              </ListItemButton>
              <ListItemButton href="/q3">
                <ListItemText primary={'Query 3'} />
              </ListItemButton>
              <ListItemButton href="/q4">
                <ListItemText primary={'Query 4'} />
              </ListItemButton>
              <ListItemButton href="/q5">
                <ListItemText primary={'Query 5'} />
              </ListItemButton>
        </List>
      </Drawer>
    </Box>
  );
};

export default PersistentDrawerLeft;
