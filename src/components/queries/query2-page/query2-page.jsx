import "./query2-page.css";
import React from "react";

import Box from '@mui/material/Box';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { Select, MenuItem } from '@mui/material';

import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

function template() {
  return (
    <div className="query-1-page">
      <Box sx={{ flexGrow: 1,  height: 700}}>
        <h1>Transportation Crimes Ratio to Total Crime in L.A. Districts</h1>
        <hr class="section-divider"/>
        <p class="subheading">
        Transportation crimes and their ratio in relation to all crimes in specific LA districts.
        See how safe a specific area might be for different modes of transportation
        </p>
        <Box class="dataVisualization">
          <Box class="filters">
            <h5>DATA FILTERS</h5>
            <i>select a district and a vehicle crime type</i>
            <Box class="Districts">
              <FormControl>
                <FormLabel class="label">
                  Districts*
                </FormLabel>
                <hr class="filter-hr"/>
                <Select value={1}>
                  <MenuItem value={1}>District 1</MenuItem>
                  <MenuItem value={2}>District 2</MenuItem>
                  <MenuItem value={3}>District 3</MenuItem>
                  <MenuItem value={4}>District 4</MenuItem>
                  <MenuItem value={5}>District 5</MenuItem>
                </Select>
                <i>L.A. Districts</i>
                <br />
                <i>*See Data Page for District Areas</i>
              </FormControl>
            </Box>
            <Box class="Vehicle">
              <FormControl>
                <FormLabel class="label">
                  Vehicle Crime Types*
                </FormLabel>
                <i>select up to 5</i>
                <hr class="filter-hr"/>
                <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Stolen Vehicle**" />
                  <FormControlLabel control={<Checkbox />} label="Reckless Driving" />
                  <FormControlLabel control={<Checkbox />} label="Grand Theft" />
                  <FormControlLabel control={<Checkbox />} label="Petty Theft" />
                  <FormControlLabel control={<Checkbox />} label="Attempted Theft" />
                  <FormControlLabel control={<Checkbox />} label="Train Wrecking" />
                  <FormControlLabel control={<Checkbox />} label="Vandalized Vehicle" />
                </FormGroup>
                <br />
                <i>*See Data Page for Crime Types</i>
                <i>**includes (but not limited to: motor vehicles, motorized scooters, bicycles, wheelchairs, etc.)</i>


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

export default template;
