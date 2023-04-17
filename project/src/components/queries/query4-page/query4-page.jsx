import "./query4-page.css";
import React from "react";
import Plot from 'react-plotly.js';
import { Box, FormGroup, FormControl, FormLabel, FormControlLabel, Select, MenuItem, Checkbox, Divider, Typography} from '@mui/material';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
function Template() {
  const [premises, setPremises] = React.useState('');
  const [time, setTime] = React.useState('');

  const changePremises = (event) => {
    setPremises(event.target.value);
  };
  const changeTime = (event) => {
    setTime(event.target.value);
  };
  return (
    <div className="query-4-page">
      <Box sx={{ flexGrow: 1,  height: 1000}}>
        <h1>The Connection Between Time, Premises, and Crime Type</h1>
        <Divider sx={{mb: 1.5, mt: 3, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
          <Typography sx={{color:"#484273", fontSize: 13,}}>
            Provides users with various crime trends associated with different times 
            in the day at different places. 
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
            <p class="hint">select the premise of the crime, 3 crime groupings <br></br> and a time range below</p>
            <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'70%'}}>
              <FormControl fullWidth>
                <Divider sx={{mb: 1, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
                  <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>Premise</FormLabel>
                </Divider>
                <Select 
                  value={premises}
                  label="Premises"
                  onChange={changePremises}
                  sx={{width:'90%', alignSelf:'center', borderRadius:2, height:30, backgroundColor:"#CCBBD0"}}
                  >
                  <MenuItem value={1}>STREET</MenuItem>
                  <MenuItem value={2}>SINGLE FAMILY DWELLING</MenuItem>
                  <MenuItem value={3}>MULTI-UNIT DWELLING</MenuItem>
                  <MenuItem value={4}>PARKING LOT</MenuItem>
                  <MenuItem value={5}>OTHER BUSINESS</MenuItem>
                  <MenuItem value={6}>SIDEWALK</MenuItem>
                  <MenuItem value={7}>VEHICLE, PASSENGER/TRUCK</MenuItem>
                  <MenuItem value={8}>DRIVEWAY</MenuItem>
                  <MenuItem value={9}>GARAGE/CARPORT</MenuItem>
                  <MenuItem value={10}>RESTAURANT/FAST FOOD</MenuItem>
                  <MenuItem value={11}>DEPARTMENT STORE</MenuItem>
                  <MenuItem value={12}>MARKET</MenuItem>
                  <MenuItem value={13}>OTHER STORE</MenuItem>
                  <MenuItem value={14}>PARKING UNDERGROUND/BUILDING</MenuItem>
                  <MenuItem value={15}>YARD</MenuItem>
                  <MenuItem value={16}>ALLEY</MenuItem>
                  <MenuItem value={17}>PARK/PLAYGROUND</MenuItem>
                  <MenuItem value={18}>OTHER</MenuItem>
                </Select>
                <i>crime location/premises</i>
              </FormControl>
            </Box>
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
                  <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>Time Range</FormLabel>
                </Divider>
                <Select
                  value={time}
                  label="Time Range"
                  onChange={changeTime}
                  sx={{width:'90%', alignSelf:'center', borderRadius:2, height:30, backgroundColor:"#CCBBD0"}}
                >
                  <MenuItem value={1}>6AM <ArrowRightAltIcon vertical-align="middle"/> 12PM</MenuItem>
                  <MenuItem value={2}>12:01PM <ArrowRightAltIcon vertical-align="middle"/> 6PM</MenuItem>
                  <MenuItem value={3}>6:01PM <ArrowRightAltIcon vertical-align="middle"/> 12AM</MenuItem>
                  <MenuItem value={4}>12AM <ArrowRightAltIcon vertical-align="middle"/> 5:59AM</MenuItem>
                </Select>
                <i>all time ranges are 6 hours long</i>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Template;
