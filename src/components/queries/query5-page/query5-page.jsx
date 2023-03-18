import "./query5-page.css";
import React from "react";

import Box from '@mui/material/Box';

import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function Template() {
  return (
    <div className="query-1-page">
      <Box sx={{ flexGrow: 1,  height: 700}}>
        <h1>Likelihood of Crime being Reported within 30 days</h1>
        <hr class="section-divider"/>
        <p class="subheading">
        Crime reporting patterns on often crimes are reported after 30 days versus within 30 days
        </p>
        <Box class="dataVisualization">
          <Box class="filters">
            <h5>DATA FILTERS</h5>
            <i>select up to 3 crime groupings below</i>
            <Box class="crimeGroupings3">
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
