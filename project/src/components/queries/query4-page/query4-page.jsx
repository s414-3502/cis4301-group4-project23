import "./query4-page.css";
import React, { useEffect, useState } from "react";
import { Button, Box, FormGroup, FormControl, FormLabel, FormControlLabel, Select, MenuItem, Checkbox, Divider, Typography} from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import Plot from 'react-plotly.js';
import { useQuery } from "react-query";

const fetchQuery4Data = async ({ queryKey }) => {
  const [_, premises, crimeGroups, time] = queryKey;
  console.log(premises, crimeGroups, time)
	const res = await fetch("http://localhost:8081/query_4_data" + "?" + (new URLSearchParams({
    premises,
    crimeGroups,
    time
  }).toString()));
	return res.json();
};

function Template() {
  let col = 1;
  let dataIndex = 0;
  let [premises, setPremises] = useState('');
  let [time, setTime] = useState('');
  const [dataLoading, setDataLoading] = useState(false);
  const [graphData, setGraphData] = useState([]);

  const [graphParams, setGraphParams] = useState({
    premises: '',
    crimeGroups: '',
    time: ''
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

  const { isLoading, error, data } = useQuery(["query4Data", graphParams.premises, graphParams.crimeGroups, graphParams.time], fetchQuery4Data);

  const changePremises = (event) => {
    setPremises(event.target.value);
  };
  const changeTime = (event) => {
    setTime(event.target.value);
  };

  useEffect(() => {
    if (data !== undefined && premises !== '') {
      setDataLoading(false);
      setGraphData(data['Data']);
    }
  }, [data, premises]);

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
        premises,
        crimeGroups: selectedValues.join("#"),
        time
      })
      setDataLoading(true);
    }
  }

  function scatterColor(){
    if(col == 1){
      col += 1;
      return 'purple';
    }
    else if(col == 2){
      col += 1;
      return 'orange';
    }
    else{
      col = 1;
    }
    return 'blue';
  }

  function scatterName(){
    let crimeGroupVals = graphParams.crimeGroups.split('#');
    let outVal = crimeGroupVals[dataIndex];
    if(dataIndex < 3){
      dataIndex += 1;
    }
    else{
      dataIndex = 0;
    }
    return outVal;
  }

  return (
    <div className="query-4-page">
      <Box sx={{ flexGrow: 1,  height: 1000}}>
        <h1>{dataLoading ? "loading..." : "The Connection Between Time, Premises, and Crime Type"}</h1>
        <Divider sx={{mb: 1.5, mt: 3, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
          <Typography sx={{color:"#484273", fontSize: 13,}}>
            Provides users with various crime trends associated with different times 
            in the day at different places. 
          </Typography>
        </Divider>
        <Box sx={{display: 'flex', justifyContent: 'space-between', m:8, mt:0, ml:1, height:'65%'}}>
          <Box sx={{height:600, border: 1, borderColor: 'gray', borderRadius:3, p:0}}>
            <Plot
                sx={{m:0}}
                data={graphData.map((entry) => {
                  return {
                    name: scatterName(),
                    x: entry[0],
                    y: entry[1],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: scatterColor()},
                    line:{
                      dash: 'dot'
                    }
                  }
                })}
                layout={ {
                  xaxis:{
                    title: "Year"
                  },
                  yaxis:{
                    title: "Ratio By Total Crimes"
                  },
                  width: 1000, 
                  height: 500,
                  showlegend: true,
                  legend: {
                    x: 1,
                    xanchor: 'right',
                    y: 1
                  }
                } }
            />
          </Box>
          <Box sx={{display: 'flex', flexDirection:'column', mr:-5, ml:1, mt:-5}}>
            <h5>DATA FILTERS</h5>
            <p class="hint">select the premise of the crime, 3 crime groupings <br></br> and a time range below</p>
            <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'70%'}}>
              <FormControl fullWidth>
                <Divider sx={{mb: 1, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
                  <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>Premise</FormLabel>
                </Divider>
                <Select 
                  value={premises}
                  label="Premises"
                  onChange={changePremises}
                  sx={{width:'90%', alignSelf:'center', borderRadius:2, height:30, backgroundColor:"#CCBBD0"}}
                  >
                  <MenuItem value={1}>ALLEY</MenuItem>
                  <MenuItem value={2}>DRIVEWAY</MenuItem>
                  <MenuItem value={3}>GARAGE/CARPORT</MenuItem>
                  <MenuItem value={4}>GAS STATION</MenuItem>
                  <MenuItem value={5}>MOBILE HOME/TRAILERS/CONSTRUCTION TRAILERS/RV''S/MOTORHOME</MenuItem>
                  <MenuItem value={6}>MULTI-UNIT DWELLING (APARTMENT, DUPLEX, ETC)</MenuItem>
                  <MenuItem value={7}>OTHER BUSINESS</MenuItem>
                  <MenuItem value={8}>OTHER PREMISE</MenuItem>
                  <MenuItem value={9}>POST OFFICE</MenuItem>
                  <MenuItem value={10}>SINGLE FAMILY DWELLING</MenuItem>
                  <MenuItem value={11}>STREET</MenuItem>
                  <MenuItem value={12}>VEHICLE, PASSENGER/TRUCK</MenuItem>
                </Select>
                <i>crime location/premises</i>
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
              </FormControl>
            </Box>
            <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'70%'}}>
              <FormControl fullWidth>
              <Divider sx={{mb: 1, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
                  <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>Time Range</FormLabel>
                </Divider>
                <Select
                  value={time}
                  label="Time Range"
                  onChange={changeTime}
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
            <Button
                  sx={{m:1, backgroundColor:"#95799c", width: '60%', alignSelf:'center'}}
                  variant="contained" 
                  onClick={() => {handleSave()}}>Save
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Template;