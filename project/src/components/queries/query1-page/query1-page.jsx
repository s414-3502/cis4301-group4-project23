import "./query1-page.css";
import React, { useCallback, useEffect, useState } from "react";
import Plot from 'react-plotly.js';
import { useQuery } from "react-query";

import { Box, FormGroup, FormControl, FormLabel, FormControlLabel,   
        Select, MenuItem, Button, Checkbox, Divider, Typography, Radio, RadioGroup} from '@mui/material';

const fetchQuery1Data = async ({ queryKey }) => {
  const [_, covidStatus, season, crimeGroups] = queryKey;
  console.log(covidStatus, season, crimeGroups)
	const res = await fetch("http://localhost:8081/query_1_data" + "?" + (new URLSearchParams({
    covidStatus,
    season,
    crimeGroups
  }).toString()));
	return res.json();
};

function Template() {

  let [season, setSeason] = React.useState('');
  let [covidStatus, setCovidStatus] = React.useState('');
  const [dataLoading, setDataLoading] = React.useState(false);
  const [graphData, setGraphData] = useState([]);

  const [graphParams, setGraphParams] = useState({
    covidStatus: '',
    season: '',
    crimeGroups: ''
  });

  const crimeGroupNames = [ 'MINOR CRIMES',
  'BURGLARIES, THEFT AND PROPERTY CRIMES',
  'SEXUAL CRIMES',
  'ROBBERY OR THEFT AGAINST A PERSON',
  'DRUGS',
  'WHITE COLLAR CRIME',
  'VULNERABLE ADULT CRIMES',
  'SERIOUS OR VIOLENT CRIMES AND OFFENSES',
  'VEHICLE RELATED CRIMES',
  'BATTERY OR ASSAULT',
  'CHILD ABUSE',
  'GUN CRIMES'];

  const [toggleValues, setToggleValues] = useState(crimeGroupNames.map(() => {
    return false
  }));

  const { isLoading, error, data } = useQuery(["query1Data", graphParams.covidStatus, graphParams.season, graphParams.crimeGroups], fetchQuery1Data);

  const changeSeason = (event) => {
    setSeason(event.target.value);
  };
  const changeCovidStatus = (event) => {
    setCovidStatus(event.target.value);
  };

    useEffect(() => {
    if (data !== undefined) {
      setDataLoading(false);
      setGraphData(data['Data']);
    }
  }, [data, graphParams]);
  
  const handleSave = () => {
    let countTotalSelected = 0;
    let selectedValues = [];
    toggleValues.forEach((value, index) => {
      if (value) {
        countTotalSelected++;
        selectedValues.push(crimeGroupNames[index]);
      }
    })
    if (countTotalSelected == 0 || countTotalSelected > 3) {
      console.log("Error");
    }
    else {
      console.log("passed")
      setGraphData([]);
      console.log(selectedValues);
      setGraphParams({
        covidStatus,
        season,
        crimeGroups: selectedValues.join("#")
      })
      setDataLoading(true);
    }
  }
 
  return (
    <div className="query-1-page">
      <Box sx={{ flexGrow: 1,  height: 1000}}>
        <h1>
          {dataLoading ? "loading..." : "Seasonal L.A. Crime Throughout COVID-19 Seasons"}</h1>
        <Divider sx={{mb: 1.5, mt: 3, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
          <Typography sx={{color:"#484273", fontSize: 13,}}>
            An overview of crime trends across the four seasons (Spring, Summer, Fall, and Winter) in L.A.
            (averaged from 2017 to 2022 with COVID-19 consideration)
            </Typography>
        </Divider>
          <Box sx={{display: 'flex', m:8, mt:0, height:'65%'}}>
              <Box sx={{width: '80%', border: 1, borderColor: 'gray', borderRadius:3}}>
                <Plot
                  data={graphData.map((entry) => {
                    return {
                      x: entry[0],
                      y: entry[1],
                      type: 'bar',
                      mode: 'lines+markers',
                      marker: {color: 'purple'},
                    }
                  })}
                  layout={ {width: 1200, height: 600} }
              />
              </Box>
              <Box sx={{display: 'flex', flexDirection:'column', mr:-3, ml:1,}}>
              <h5>DATA FILTERS</h5>
              <br />
              <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'70%'}}>
                <FormControl fullWidth>
                  <Divider sx={{mb: 1, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
                    <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>
                      Seasons
                    </FormLabel>
                  </Divider>
                  <Select value={season} label="season" onChange={changeSeason}                   
                  sx={{width:'90%', alignSelf:'center', borderRadius:2, height:30, backgroundColor:"#CCBBD0"}}>
                    <MenuItem value={1}>Spring</MenuItem>
                    <MenuItem value={2}>Summer</MenuItem>
                    <MenuItem value={3}>Fall</MenuItem>
                    <MenuItem value={4}>Winter</MenuItem>
                  </Select>
                  <i>Northern-hemispheric season</i>
                </FormControl>
              </Box>
              <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'70%'}}>
                <FormControl>
                    <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>
                      Include COVID-19 Data?
                      <hr class="filter-hr"/>
                    </FormLabel>
                    <RadioGroup
                      defaultValue={covidStatus} label="covidStatus" onChange={changeCovidStatus}
                      sx={{width:'90%', alignSelf:'center', borderRadius:2, height:30, backgroundColor:"#CCBBD0"}}>
                      <FormControlLabel class="options" value="Yes" control={<Radio size="small"/>} label="Yes" />
                      <FormControlLabel class="options" value="No" control={<Radio size="small"/>} label="No" />
                    </RadioGroup>
                  </FormControl>
              </Box>
                            <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'70%', maxHeight:'40%', overflowY:"scroll",}}>
                <FormControl fullWidth>
                  <Divider sx={{mb: 0, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
                    <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>Crime Groupings</FormLabel>
                  </Divider>
                  <i class="hint">*select up to 3</i>
                  <FormGroup>
                    {
                      crimeGroupNames.map((name, index) => {
                      return <FormControlLabel control={<Checkbox onChange={(event) => {
                        let temp = toggleValues;
                        temp[index] = event.target.checked;
                        setToggleValues(temp)
                        console.log(toggleValues);
                      }} />} label={<Typography sx={{ fontSize: 14, }}>{name}</Typography>} />
                    })
                    }
                  </FormGroup>
                  <i>*See data page for Crime Groupings</i>
                  <Button variant="contained" onClick={() => {
                  handleSave()
                }}>Save</Button>
                </FormControl>
              </Box>
            </Box> 
          </Box>
      </Box>
    </div>
  );
};

export default Template;
