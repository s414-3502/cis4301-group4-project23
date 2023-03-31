import "./query4-page.css";
import React from "react";
import { Box, FormGroup, FormControl, FormLabel, FormControlLabel, Select, MenuItem, Checkbox, Divider} from '@mui/material';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
function Template() {
  return (
    <div className="query-4-page">
      <Box sx={{ flexGrow: 1,  height: 700}}>
        <h1>The Connection Between Time, Premises, and Crime Type</h1>
        <hr class="section-divider"/>
        <p class="subheading">
          Provides users with various crime trends associated with different times 
          in the day at different places. 
        </p>
        <Box 
        sx={{display: 'flex', m:8, mt:0, height:'65%'}}
        >
          <Box sx={{width: '80%', borderTop: 1, borderBottom: 1, borderColor: 'gray'}}>

          </Box>
          <Box sx={{display: 'flex', flexDirection:'column'}}>
            <h5>DATA FILTERS</h5>
            <p class="hint">select the premise of the crime, 3 crime groupings <br></br> and a time range below</p>
            <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'60%'}}>
              <FormControl fullWidth>
                <Divider sx={{mb: 1, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
                  <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>Premise</FormLabel>
                </Divider>
                <Select value={1} 
                  sx={{width:'90%', alignSelf:'center', borderRadius:2, height:30, backgroundColor:"#CCBBD0"}}
                  >
                  <MenuItem value={1}>Premise-Group1</MenuItem>
                  <MenuItem value={2}>Premise-Group2</MenuItem>
                  <MenuItem value={3}>Premise-Group3</MenuItem>
                  <MenuItem value={4}>Premise-Group4</MenuItem>
                </Select>
                <i>crime location/premises</i>
              </FormControl>
            </Box>
            <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'60%', maxHeight:'40%', overflowY:"scroll",}}>
              <FormControl fullWidth>
                <Divider sx={{mb: 0, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
                  <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>Crime Groupings</FormLabel>
                </Divider>
                <i class="hint">*select up to 3</i>
                <FormGroup>
                  <FormControlLabel class="options" control={<Checkbox defaultChecked />} label="Minor Crimes" />
                  <FormControlLabel class="options" control={<Checkbox />} label="Serious/Violent Crimes and Offenders" />
                  <FormControlLabel class="options" control={<Checkbox />} label="Sexual Crimes" />
                  <FormControlLabel class="options" control={<Checkbox />} label="Battery or Assault" />
                  <FormControlLabel class="options" control={<Checkbox />} label="Child Abuse" />
                  <FormControlLabel class="options" control={<Checkbox />} label="Gun Crimes" />
                  <FormControlLabel class="options" control={<Checkbox />} label="Robbery/Theft Against Person" />
                  <FormControlLabel class="options" control={<Checkbox />} label="Burglaries, Theft, and Property Crimes" />
                  <FormControlLabel class="options" control={<Checkbox />} label="Vehicle Related Crimes" />
                  <FormControlLabel class="options" control={<Checkbox />} label="Drugs" />
                  <FormControlLabel class="options" control={<Checkbox />} label="Vulnerable Adult Crimes" />
                  <FormControlLabel class="options" control={<Checkbox />} label="White Collar Crimes" />
                </FormGroup>
                <i class="hint">*See data page for Crime Groupings</i>
              </FormControl>
            </Box>
            <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'60%'}}>
              <FormControl fullWidth>
              <Divider sx={{mb: 1, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
                  <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>Time Range</FormLabel>
                </Divider>
                <Select value={1}
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
        <hr class="section-divider"/>
        <h2>DATA ANALYSIS</h2>
        <Box sx={{backgroundColor: "#D5D1ED", mx:15, p:2, pt:0.1, borderRadius:3}}> 
          <h3>Data Analysis and Interpretation</h3>
          <p class="normal">Here is where a summary of the analysis of the data and the results will go. 
            Of course, this section can only be completed after we have made the actual 
            trend analysis for the web application. Only after deriving the results can 
            we make an educated analysis of the data and the connections within it.
          </p>
          <p class="normal">
          Here is where a summary of the analysis of the data and the results will go. 
          Of course, this section can only be completed after we have made the actual trend 
          analysis for the web application. Only after deriving the results can we make an 
          educated analysis of the data and the connections within it.
          </p>
        </Box>
        <Box>
        </Box>
      </Box>
    </div>
  );
};

export default Template;
