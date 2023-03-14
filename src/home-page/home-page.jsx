import "./home-page.css";
import React from "react";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function template() {
  return (
    <div className="home-page">
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid xs={10} >
          <Item>
            <h1>Los Angeles Crime Data</h1>
            <h3>Visualizations and Analysis</h3>
            <p>A user-friendly web application that focuses specifically on filtering and answering 
              serious queries about crime in Los Angeles through local crime data from 2017-2022, along with  
              COVID data in  relatively the same area.  
            </p>
          </Item>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid xs={2}>
          <Item>
            <h3><b>QUERY 1</b></h3>
            <h4>Seasonal L.A. Crime Throughout COVID-19 Seasons</h4>
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <h3><b>QUERY 2</b></h3>
            <h4>Transportation Crimes Ratio to Total Crime in L.A. Districts</h4>
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <h3><b>QUERY 3</b></h3>
            <h4>Victim Profiling Based on Demographic Factors</h4>
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <h3><b>QUERY 4</b></h3>
            <h4>The Connection Between Time, Premises, and Crime Type</h4>
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <h3><b>QUERY 5</b></h3>
            <h4>Likelihood of Crime being Reported within 30 days</h4>
          </Item>
        </Grid>
      </Grid>
      </Box>
    </div>
  );
};

export default template;
