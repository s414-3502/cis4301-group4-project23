import "./query4-page.css";
import React from "react";

import Box from '@mui/material/Box';

import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { Select, MenuItem } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function Template() {
  return (
    <div className="query-1-page">
      <Box sx={{ flexGrow: 1,  height: 700}}>
        <h1>The Connection Between Time, Premises, and Crime Type</h1>
        <hr class="section-divider"/>
        <p class="subheading">
          Provides users with various crime trends associated with different times 
          in the day at different places. 
        </p>
        <Box class="dataVisualization">
          <Box class="filters">
            <h5>DATA FILTERS</h5>
            <i>select the premise of the crime, 3 crime groupings and a time range below</i>
            <Box class="Premises">
              <FormControl>
                <FormLabel class="label">
                  Premises
                </FormLabel>
                <hr class="filter-hr"/>
                <Select value={1}>
                  <MenuItem value={1}>Premise-Group1</MenuItem>
                  <MenuItem value={2}>Premise-Group2</MenuItem>
                  <MenuItem value={3}>Premise-Group3</MenuItem>
                  <MenuItem value={4}>Premise-Group4</MenuItem>
                </Select>
                <i>crime location/premises</i>
              </FormControl>
            </Box>
            <Box class="crimeGroupings">
              <FormControl>
                <FormLabel class="label">
                  Crime Groupings
                  <br />
                  <i>*select up to 3</i>
                  <br />
                  <hr class="filter-hr"/>
                  <i>*See data page for Crime Groupings</i>
                </FormLabel>
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
              </FormControl>
            </Box>
            <Box class="Time">
              <FormControl>
                <FormLabel class="label">
                  Time Range
                </FormLabel>
                <hr class="filter-hr"/>
                <Select value={1}>
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
        <Box class="interpretation"> 
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
