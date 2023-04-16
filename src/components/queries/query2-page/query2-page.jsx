import "./query2-page.css";
import React from "react";
import Plot from 'react-plotly.js';
// import prepareOutputQ2 from './../../../utils/query_2_handler.js';

import { Box, FormControlLabel, FormControl, FormLabel,
          Select, MenuItem, FormGroup, Checkbox, Divider, 
          Typography }from '@mui/material';

function Template() {
  const [district, setDistrict] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [x, setX] = React.useState([])
  const [y, setY] = React.useState([])

  const changeDistrict = (event) => {
    setDistrict(event.target.value);
  }

  return (
    <div className="query-2-page">
      <Box sx={{ flexGrow: 1,  height: 1000}}>
        <h1>
          {loading ? "loading..." : "Transportation Crimes Ratio to Total Crime in L.A. Districts"}</h1>
        <Divider sx={{mb: 1.5, mt: 3, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
          <Typography sx={{color:"#484273", fontSize: 13,}}>
          Transportation crimes and their ratio in relation to all crimes in specific LA districts.
          See how safe a specific area might be for different modes of transportation
          </Typography>
        </Divider>
        <Box sx={{display: 'flex', m:8, mt:0, height:'65%'}}>
          <Box sx={{width: '80%', border: 1, borderColor: 'gray', borderRadius:3}}>
            <Plot
              data={[
                {
                  x: x
                  ,
                  y: y
                 ,
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: {color: 'purple'},
                },
              ]}
              layout={ {width: 1200, height: 600} }
              />
          </Box>
          <Box sx={{display: 'flex', flexDirection:'column', mr:-3, ml:1,}}>
            <h5>DATA FILTERS</h5>
            <p class="hint">select a district and a vehicle crime type</p>
            <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'70%'}}>
              <FormControl fullWidth>
                  <Divider sx={{mb: 1, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
                    <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>
                      Districts*
                    </FormLabel>
                  </Divider>
                <Select value={district} label="district" onChange={changeDistrict}                   
                  sx={{width:'90%', alignSelf:'center', borderRadius:2, height:30, backgroundColor:"#CCBBD0"}}>
                  <MenuItem value={1}>District 1</MenuItem>
                  <MenuItem value={2}>District 2</MenuItem>
                  <MenuItem value={3}>District 3</MenuItem>
                  <MenuItem value={4}>District 4</MenuItem>
                  <MenuItem value={5}>District 5</MenuItem>
                </Select>
                <i>L.A. Districts</i>
                <i>*See Data Page for District Areas</i>
              </FormControl>
            </Box>
            <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'70%', maxHeight:'40%', overflowY:"scroll",}}>
              <FormControl fullWidth>
                  <Divider sx={{mb: 0, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
                    <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>Vehicle Crime Types*</FormLabel>
                  </Divider>
                  <i class="hint">select up to 5</i>
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label={<Typography sx={{fontSize:14,}}>Stolen Vehicle**</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography sx={{fontSize:14,}}>Reckless Driving</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography sx={{fontSize:14,}}>Grand Theft</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography sx={{fontSize:14,}}>Petty Theft</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography sx={{fontSize:14,}}>Attempted Theft</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography sx={{fontSize:14,}}>Train Wrecking</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography sx={{fontSize:14,}}>Vandalized Vehicle</Typography>}/>
                </FormGroup>
                <i>*See Data Page for Crime Types</i>
                <i>**includes (but not limited to: motor vehicles, motorized scooters, bicycles, wheelchairs, etc.)</i>
              </FormControl>
            </Box>
          </Box> 
        </Box>
      </Box>
    </div>
  );
};

export default Template;
