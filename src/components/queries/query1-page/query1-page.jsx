import "./query1-page.css";
import * as React from "react";

import Box from '@mui/material/Box';

import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { Select, MenuItem } from '@mui/material';

function Template() {

  return (
    <div className="query-1-page">
      <Box sx={{ flexGrow: 1,  height: 700}}>
        <h1>Seasonal L.A. Crime Throughout COVID-19 Seasons</h1>
        <hr class="section-divider"/>
        <p class="subheading">An overview of crime trends across the four seasons (Spring, Summer, Fall, and Winter) in L.A.
          (averaged from 2017 to 2022 with COVID-19 consideration)
        </p>
        <Box class="dataVisualization">
          <Box class="filters">
            <h5>DATA FILTERS</h5>
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
            <Box class="Seasons">
              <FormControl>
                <FormLabel class="label">
                  Seasons
                </FormLabel>
                <hr class="filter-hr"/>
                <Select value={1}>
                  <MenuItem value={1}>Spring</MenuItem>
                  <MenuItem value={2}>Summer</MenuItem>
                  <MenuItem value={3}>Fall</MenuItem>
                  <MenuItem value={4}>Winter</MenuItem>
                </Select>
                <i>Northern-hemispheric season</i>
              </FormControl>
            </Box>
            <Box class="CovidData">
            <FormControl>
                <FormLabel class="label">
                  Include COVID-19 Data?
                  <hr class="filter-hr"/>
                </FormLabel>
                <RadioGroup
                  defaultValue="Yes">
                  <FormControlLabel class="options" value="Yes" control={<Radio size="small"/>} label="Yes" />
                  <FormControlLabel class="options" value="No" control={<Radio size="small"/>} label="No" />
                </RadioGroup>
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
