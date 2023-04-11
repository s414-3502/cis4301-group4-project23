import "./query1-page.css";
import * as React from "react";
import Plot from 'react-plotly.js';

import { Box, FormGroup, FormControl, FormLabel, FormControlLabel,   
        Select, MenuItem, Checkbox, Divider, Typography, Radio, RadioGroup} from '@mui/material';


function Template() {

  const [season, setSeason] = React.useState('');
  const [covidStatus, setCovidStatus] = React.useState('');

  const changeSeason = (event) => {
    setSeason(event.target.value);
  };
  const changeCovidStatus = (event) => {
    setCovidStatus(event.target.value);
  };

  return (
    <div className="query-1-page">
      <Box sx={{ flexGrow: 1,  height: 1000}}>
        <h1>Seasonal L.A. Crime Throughout COVID-19 Seasons</h1>
        <Divider sx={{mb: 1.5, mt: 3, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
          <Typography sx={{color:"#484273", fontSize: 13,}}>
            An overview of crime trends across the four seasons (Spring, Summer, Fall, and Winter) in L.A.
            (averaged from 2017 to 2022 with COVID-19 consideration)
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
              <br />
              <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'70%', maxHeight:'40%', overflowY:"scroll",}}>
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
              <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'70%'}}>
                <FormControl fullWidth>
                  <Divider sx={{mb: 1, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
                    <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>
                      Seasons
                    </FormLabel>
                  </Divider>
                  <Select value={season} label="season" onChange={changeSeason}                   
                  sx={{width:'90%', alignSelf:'center', borderRadius:2, height:30, backgroundColor:"#CCBBD0"}}>
                    <MenuItem value={1}>Spring</MenuItem>
                    <MenuItem value={2}>Summer</MenuItem>
                    <MenuItem value={3}>Fall</MenuItem>
                    <MenuItem value={4}>Winter</MenuItem>
                  </Select>
                  <i>Northern-hemispheric season</i>
                </FormControl>
              </Box>
              <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'70%'}}>
                <FormControl>
                    <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>
                      Include COVID-19 Data?
                      <hr class="filter-hr"/>
                    </FormLabel>
                    <RadioGroup
                      defaultValue={covidStatus} label="covidStatus" onChange={changeCovidStatus}
                      sx={{width:'90%', alignSelf:'center', borderRadius:2, height:30, backgroundColor:"#CCBBD0"}}>
                      <FormControlLabel class="options" value="Yes" control={<Radio size="small"/>} label="Yes" />
                      <FormControlLabel class="options" value="No" control={<Radio size="small"/>} label="No" />
                    </RadioGroup>
                  </FormControl>
              </Box>
            </Box> 
          </Box>
      </Box>
    </div>
  );
};

export default Template;
