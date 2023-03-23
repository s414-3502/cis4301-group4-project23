import "./side-navbar.css";
import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const menuWidth = 300;
  const menuItems = ['Query1', 'Query2', 'Query3','Query4', 'Query5'];

function template() {
  return (
    <Box component="side-navbar">
      <Typography>Query 1</Typography>
      <Typography>Query 2</Typography>
      <Typography>Query 3</Typography>
      <Typography>Query 4</Typography>
      <Typography>Query 5</Typography>
    </Box>
  );
};

export default template;
