import "./query3-page.css";
import React from "react";
import Plot from 'react-plotly.js';

import { Box, FormControl, FormLabel, Select, MenuItem, FormGroup, Slider,
         Checkbox, TextField, Autocomplete, Divider, Typography} from '@mui/material';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const minDistance = 20;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function Template() {
  const [value1, setValue1] = React.useState([20, 50]);
  const [sex, setSex] = React.useState('');


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


  const changeSex = (event) => {
    setSex(event.target.value);
  };

  return (
    <div className="query-3-page">
      <Box sx={{ flexGrow: 1,  height: 1000}}>
        <h1>Victim Profiling Based on Demographic Factors</h1>
        <Divider sx={{mb: 1.5, mt: 3, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
          <Typography sx={{color:"#484273", fontSize: 13,}}>
            Common crimes committed  in L.A. based on age, sex and descent.
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
            <p class="hint">select sex, one or more racial descents, and an age range</p>
            <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'70%'}}>
              <FormControl fullWidth>
                <Divider sx={{mb: 1, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
                  <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>
                    Sex
                  </FormLabel>
                </Divider>                
                <Select value={sex} label="sex" onChange={changeSex}                   
                  sx={{width:'90%', alignSelf:'center', borderRadius:2, height:30, backgroundColor:"#CCBBD0"}}>
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={2}>Female</MenuItem>
                  <MenuItem value={3}>Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'70%'}}>
              <FormControl fullWidth>
                <Divider sx={{mb: 1, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
                  <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>
                    Descent
                  </FormLabel>
                </Divider>
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
=                <i>One or more racial identities</i>
              </FormControl>
            </Box>
            <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'70%'}}>
              <FormControl fullWidth>
                <Divider sx={{mb: 1, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
                  <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>
                    Age Range
                  </FormLabel>
                </Divider>
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

