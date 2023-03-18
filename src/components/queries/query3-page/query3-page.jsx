import "./query3-page.css";
import React from "react";

import Box from '@mui/material/Box';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Select, MenuItem } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';

import Slider from '@mui/material/Slider';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import InputLabel from '@mui/material/InputLabel';

const minDistance = 20;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function Template() {
  const [value1, setValue1] = React.useState([20, 50]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const [sex, setSex] = React.useState('');

  const handleChange = (event) => {
    setSex(event.target.value);
  };

  return (
    <div className="query-1-page">
      <Box sx={{ flexGrow: 1,  height: 700}}>
        <h1>Victim Profiling Based on Demographic Factors</h1>
        <hr class="section-divider"/>
        <p class="subheading">
        Common crimes committed  in L.A. based on age, sex and descent.
        </p>
        <Box class="dataVisualization">
          <Box class="filters">
            <h5>DATA FILTERS</h5>
            <i>select sex, one or more racial descents, and an age range</i>
            <Box class="Sex">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sex}
                  label="sex"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={2}>Female</MenuItem>
                  <MenuItem value={3}>Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box class="Descent">
              <FormControl>
                <FormGroup>
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={descentOptions}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.label}
                      </li>
                    )}
                    style={{ width: 200 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Descent"/>
                    )}
                  />
                </FormGroup>
                <br />
                <i>One or more racial identities</i>
              </FormControl>
            </Box>
            <Box class="Age">
              <FormControl>
                <FormLabel class="label">
                  Age Range
                </FormLabel>
                <hr class="filter-hr"/>
                <FormGroup>
                  <Slider
                    size="small"
                    getAriaLabel={() => 'Minimum distance'}
                    value={value1}
                    onChange={handleChange1}
                    valueLabelDisplay="auto"
                    disableSwap
                  />
                </FormGroup>
              </FormControl>
              <br />
              <i>Upper and lower bound</i>
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

const descentOptions = [
  {label: "Other Asian"},
  {label: "Black"},
  {label: "Chinese"},
  {label: "Cambodian"},
  {label: "Filipino"},
  {label: "Guamanian"},
  {label: "Hispanic/Latin/Mexican"},
  {label: "American Indian/Alaskan Native"},
  {label: "Japanese"},
  {label: "Korean"},
  {label: "Laotian"},
  {label: "Other"},
  {label: "Pacific Islander"},
  {label: "Samoan"},
  {label: "Hawaiian"},
  {label: "Vietnamese"},
  {label: "White"},
  {label: "Unknown"},
  {label: "Asian Indian"}
]

