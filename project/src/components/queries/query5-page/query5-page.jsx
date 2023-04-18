import "./query5-page.css";
import React from "react";
import Plot from 'react-plotly.js';

import { Box, FormGroup, Checkbox, FormControlLabel, FormControl,
          Divider, Typography, FormLabel } from '@mui/material';

function Template() {
  return (
    <div className="query-5-page">
      <Box sx={{ flexGrow: 1,  height: 1000}}>
        <h1>Likelihood of Crime being Reported within 30 days</h1>
        <Divider sx={{mb: 1.5, mt: 3, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
          <Typography sx={{color:"#484273", fontSize: 13,}}>
            Crime reporting patterns on often crimes are reported after 
            30 days versus within 30 days
          </Typography>
        </Divider>
        <Box sx={{display: 'flex', m:8, mt:0, height:'65%'}}>
          <Box sx={{width: '80%', border: 1, borderColor: 'gray', borderRadius:3}}>
            <Plot
              data={[
                {
                  x: ["2013-10-04 22:23:00", "2013-11-04 22:23:00", "2013-12-04 22:23:00"],
                  y: [1, 3, 6],
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: {color: 'purple'},
                },
              ]
              }
              layout={ {width: 1200, height: 600} }
            />
          </Box>
          <Box sx={{display: 'flex', flexDirection:'column', mr:-3, ml:1,}}>
            <h5>DATA FILTERS</h5>
            <p class="hint">select up to 3 crime groupings below</p>
            <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'70%', maxHeight:'100%', overflowY:"scroll",}}>
              <FormControl fullWidth>
                <Divider sx={{mb: 0, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
                  <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>Crime Groupings</FormLabel>
                </Divider>
                <i class="hint">*select up to 3</i>
                <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked />} label={<Typography sx={{fontSize:14,}}>Minor Crimes</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography sx={{fontSize:14,}}>Serious/Violent Crimes and Offenders</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography sx={{fontSize:14,}}>Sexual Crimes</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography sx={{fontSize:14,}}>Battery or Assault</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography sx={{fontSize:14,}}>Child Abuse</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography sx={{fontSize:14,}}>Gun Crimes</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography sx={{fontSize:14,}}>Robbery/Theft Against Person</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography sx={{fontSize:14,}}>Burglaries, Theft, and Property Crimes</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography sx={{fontSize:14,}}>Vehicle Related Crimes</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography sx={{fontSize:14,}}>Drugs</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography sx={{fontSize:14,}}>Vulnerable Adult Crimes</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography sx={{fontSize:14,}}>White Collar Crimes</Typography>}/>
                </FormGroup>
                <i>*See data page for Crime Groupings</i>
              </FormControl>
            </Box>
          </Box> 
        </Box>
      </Box>
    </div>
  );
};

export default Template;
