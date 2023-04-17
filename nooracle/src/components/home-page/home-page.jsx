import "./home-page.css";
import React from "react";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import { Link } from "react-router-dom";
import { ButtonBase, Typography } from '@mui/material';

//light purple
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#D5D1ED',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  height: 160, 
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

//dark purple
const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#B1A7C6',
  ...theme.typography.body2,
  height: 160, 
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

//tuple button
const Item3 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#C5C6D0' : '#7F7D9C',
  ...theme.typography.body2,
  height: 60, 
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));



function template() {
  return (
    <div className="home-page">
      <Box sx={{ flexGrow: 1,  height: 700,}}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid xs={10} >
          <Item>
              <h1>Los Angeles Crime Data</h1>
              <Typography sx={{mt: 2, fontWeight: 'bold'}}>Visualizations and Analysis</Typography>
              <p>A user-friendly web application that focuses specifically on filtering and answering 
                serious queries about crime in Los Angeles through local crime data from 2017-2022, along with  
                COVID data in  relatively the same area.  
              </p>
            </Item>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid xs={2}>
          <ButtonBase component={Link} to="/q1">
            <Item2>
              <Typography sx={{mt: 2, fontWeight: 'bold'}}><b>QUERY 1</b></Typography>
              <h4>Seasonal L.A. Crime Throughout COVID-19 Seasons</h4>
            </Item2>
          </ButtonBase>
        </Grid>
        <Grid xs={2}>
          <ButtonBase component={Link} to="/q2">
            <Item>
              <Typography sx={{mt: 2, fontWeight: 'bold'}}><b>QUERY 2</b></Typography>
              <h4>Transportation Crimes Ratio to Total Crime in L.A. Districts</h4>
            </Item>
          </ButtonBase>
        </Grid>
        <Grid xs={2}>
          <ButtonBase component={Link} to="/q3">
            <Item2>
              <Typography sx={{mt: 2, fontWeight: 'bold'}}><b>QUERY 3</b></Typography>
              <h4>Victim Profiling Based on Demographic Factors</h4>
            </Item2>
          </ButtonBase>
        </Grid>
        <Grid xs={2}>
          <ButtonBase component={Link} to="/q4">
            <Item>
              <Typography sx={{mt: 2, fontWeight: 'bold'}}><b>QUERY 4</b></Typography>
              <h4>The Connection Between Time, Premises, and Crime Type</h4>
            </Item>
          </ButtonBase>
        </Grid>
        <Grid xs={2}>
          <ButtonBase component={Link} to="/q5">
            <Item2>
              <Typography sx={{mt: 2, fontWeight: 'bold'}}><b>QUERY 5</b></Typography>
              <h4>Likelihood of Crime being Reported within 30 days</h4>
            </Item2>
          </ButtonBase>
        </Grid>
      </Grid>
      <br />
      <br />
      <ButtonBase>
        <Item3>
            <h2>Click to Calculate Number of Tuples in Dataset</h2>
        </Item3>
      </ButtonBase>
      </Box>
    </div>
  );
};

export default template;
