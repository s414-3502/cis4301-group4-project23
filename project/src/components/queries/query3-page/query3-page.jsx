import "./query3-page.css";
import React, { useCallback, useEffect, useState } from "react";
import Plot from 'react-plotly.js';

import {
  Box, FormControlLabel, FormControl, FormLabel,
  Select, MenuItem, FormGroup, Checkbox, Divider,
  Typography, Autocomplete, TextField, Slider, RadioGroup, Radio,
  Button
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useQuery } from "react-query";

const fetchQuery3Data = async ({ queryKey }) => {
  const [_, sex, descent, ageStart, ageEnd] = queryKey;
  const res = await fetch("http://localhost:8081/query_3_data" + "?" + (new URLSearchParams({
    sex,
    descent,
    ageStart,
    ageEnd
  }).toString()));
  return res.json();
};

const minDistance = 20;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function Template() {
  const [sex, setSex] = React.useState(-1);
  const [descent, setDescent] = React.useState('');
  const [ageRange, setAgeRange] = React.useState([20, 50]);

  const [dataLoading, setDataLoading] = React.useState(false);

  const [graphParams, setGraphParams] = useState({
    sex: '',
    descentOption: '',
    ageRange: [],
  })

  const [graphData, setGraphData] = useState([]);

  const sexOptions = [
    ["Male", "M"],
    ["Female", "F"],
    ["Other", "X"],
  ];

  const descentOptions = [
    "Other Asian: A",
    "Black: B",
    "Chinese: C",
    "Cambodian: D",
    "Filipino: F",
    "Guamanian: G",
    "Hispanic/Latin/Mexican: H",
    "American Indian/Alaskan Native: I",
    "Japanese: J",
    "Korean: K",
    "Laotian: L",
    "Other: O",
    "Pacific Islander: P",
    "Samoan: S",
    "Hawaiian: U",
    "Vietnamese: V",
    "White: W",
    "Unknown: X",
    "Asian Indian: Z",
  ]

  const handleAgeRangeChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setAgeRange([Math.min(newValue[0], ageRange[1] - minDistance), ageRange[1]]);
    } else {
      setAgeRange([ageRange[0], Math.max(newValue[1], ageRange[0] + minDistance)]);
    }
  };

  const { isLoading, error, data } = useQuery(["query3Data", graphParams.sex, graphParams.descent, graphParams.ageStart, graphParams.ageEnd], fetchQuery3Data);

  useEffect(() => {
    if (data !== undefined) {
      setDataLoading(false);
      setGraphData(data['Data']);
    }
  }, [data, graphParams]);


  const handleSave = () => {
    console.log("Selected Sex: ", sexOptions[sex][1]);
    console.log("Selected Descents: ", descent);
    console.log("Selected Age Range: ", ageRange);
    setGraphParams({
      sex: sexOptions[sex][1],
      descent: descent,
      ageStart: ageRange[0],
      ageEnd: ageRange[1],
    })

    // let countTotalSelected = 0;
    // let selectedValues = "";
    // toggleValues.forEach((value, index) => {
    //   if (value) {
    //     countTotalSelected++;
    //     selectedValues += descentOptions[index] + "#";
    //   }
    // })
    // if (countTotalSelected == 0 || countTotalSelected > 5) {
    //   console.log("Error");
    // }
    // else {
    //   console.log("passed")
    //   setX([]);
    //   setY([]);
    //   console.log(selectedValues);
    //   setGraphParams({
    //     sex,
    //     descentOptions: selectedValues
    //   })
    //   setDataLoading(true);
    // }
  }


  return (
    <div className="query-3-page">
      <Box sx={{ flexGrow: 1, height: 1000 }}>
        <h1>Victim Profiling Based on Demographic Factors</h1>
        <Divider sx={{ mb: 1.5, mt: 3, "&::before, &::after": { borderColor: "#7c76a3", }, }}>
          <Typography sx={{ color: "#484273", fontSize: 13, }}>
            Common crimes committed  in L.A. based on age, sex and descent.
          </Typography>
        </Divider>
        <Box sx={{ display: 'flex', m: 8, mt: 0, height: '65%' }}>
          <Box sx={{ width: '80%', border: 1, borderColor: 'gray', borderRadius: 3 }}>
            <Plot
               data={graphData.map((entry) => {
                return {
                  x: entry[0],
                  y: entry[1],
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: {color: 'purple'},
                }
              })}
              layout={{ width: 1200, height: 600 }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', mr: -3, ml: 1, }}>
            <h5>DATA FILTERS</h5>
            <p class="hint">select sex, one or more racial descents, and an age range</p>
            <Box sx={{ alignSelf: 'center', backgroundColor: '#EAE6EB', borderRadius: 2, px: 3, py: 1, mb: 1, width: '70%' }}>
              <FormControl fullWidth>
                <Divider sx={{ mb: 1, "&::before, &::after": { borderColor: "#7c76a3", }, }}>
                  <FormLabel sx={{ color: 'black', fontWeight: 'medium', width: '100%', textAlign: 'center' }}>
                    Sex
                  </FormLabel>
                </Divider>
                <Select value={sex} label="sex" onChange={(event) => {
                  // sex changed here
                  setSex(event.target.value);
                }}
                  sx={{ width: '90%', alignSelf: 'center', borderRadius: 2, height: 30, backgroundColor: "#CCBBD0" }}>
                  {
                    sexOptions.map((entry, index) => {
                      return <MenuItem value={index}>{entry[0]}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ alignSelf: 'center', backgroundColor: '#EAE6EB', borderRadius: 2, px: 3, py: 1, mb: 1, width: '70%' }}>
              <FormControl fullWidth>
                <Divider sx={{ mb: 1, "&::before, &::after": { borderColor: "#7c76a3", }, }}>
                  <FormLabel sx={{ color: 'black', fontWeight: 'medium', width: '100%', textAlign: 'center' }}>
                    Descent
                  </FormLabel>
                </Divider>

                <RadioGroup
                onChange={(event, value) => {
                  setDescent(value.split(" ").at(-1))
                }}
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  {
                    descentOptions.map((option) => {
                      return <FormControlLabel value={option} control={<Radio />} label={option} />
                    })
                  }
                </RadioGroup>

              </FormControl>
            </Box>
            <Box sx={{ alignSelf: 'center', backgroundColor: '#EAE6EB', borderRadius: 2, px: 3, py: 1, mb: 1, width: '70%' }}>
              <FormControl fullWidth>
                <Divider sx={{ mb: 1, "&::before, &::after": { borderColor: "#7c76a3", }, }}>
                  <FormLabel sx={{ color: 'black', fontWeight: 'medium', width: '100%', textAlign: 'center' }}>
                    Age Range
                  </FormLabel>
                </Divider>
                <FormGroup>
                  <Slider
                    size="small"
                    getAriaLabel={() => 'Minimum distance'}
                    value={ageRange}
                    onChange={handleAgeRangeChange}
                    valueLabelDisplay="auto"
                    disableSwap
                  />
                </FormGroup>
                <Button variant="contained" onClick={() => {
                  handleSave()
                }}>Save</Button>
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

