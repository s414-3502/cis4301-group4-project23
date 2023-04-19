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
  let [dataLoading, setDataLoading] = React.useState(false);
  let [graphData, setGraphData] = useState([]);

  let [crime1, setCrime1] = React.useState([]);
  let [crime2, setCrime2] = React.useState([]);
  let [crime3, setCrime3] = React.useState([]);
  let [covidData, setCovidData] = React.useState([]);
  let [crimeX1, setCrimeX1] = React.useState([]);
  let [crimeY1, setCrimeY1] = React.useState([]);
  let [crimeX2, setCrimeX2] = React.useState([]);
  let [crimeY2, setCrimeY2] = React.useState([]);
  let [crimeX3, setCrimeX3] = React.useState([]);
  let [crimeY3, setCrimeY3] = React.useState([]);
  let [covidX, setCovidX] = React.useState([]);
  let [covidY, setCovidY] = React.useState([]);

  let [graphParams, setGraphParams] = useState({
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
      console.log("data: " + data['Data']);
    }
  }, [data]);


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

  console.log("tg: " + toggleValues[0]);
  console.log("cg: " + crimeGroupNames[0]);

  let selectedCrimeGroups = [];
  for(let i = 0; i < toggleValues.length; i++){
    if(toggleValues[i] == true){
      selectedCrimeGroups.push(crimeGroupNames[i]);
    }
  }

  console.log("selected: " + selectedCrimeGroups);

  if (covidStatus == "Yes"){
    if(graphData.length == 2){//1 crimeGroup
      crime1 = graphData.at(0);
      crimeX1 = crime1[0];
      crimeY1 = crime1[1];

      covidData = graphData.at(1);
      covidX = covidData[0];
      covidY = covidData[1];

      console.log("crimeX: " + crimeX1);
      console.log("crimeY: " + crimeY1);
      console.log("covidX: " + covidX);
      console.log("covidY: " + covidY);
    }
    else if(graphData.length == 3){//2 crimeGroups
      crime1 = graphData.at(0);
      crimeX1 = crime1[0];
      crimeY1 = crime1[1];

      crime2 = graphData.at(1);
      crimeX2 = crime2[0];
      crimeY2 = crime2[1];

      covidData = graphData.at(2);
      covidX = covidData[0];
      covidY = covidData[1];
    }
    else if (graphData.length == 4){//3 crimeGroups
      crime1 = graphData.at(0);
      crimeX1 = crime1[0];
      crimeY1 = crime1[1];

      crime2 = graphData.at(1);
      crimeX2 = crime2[0];
      crimeY2 = crime2[1];

      crime3 = graphData.at(2);
      crimeX3 = crime3[0];
      crimeY3= crime3[1];

      covidData = graphData.at(3);
      covidX = covidData[0];
      covidY = covidData[1];
    }
  }
  else{
    if(graphData.length == 1){//1 crimeGroup
      crime1 = graphData.at(0);
      crimeX1 = crime1[0];
      crimeY1 = crime1[1];
    }
    else if(graphData.length == 2){//2 crimeGroups
      crime1 = graphData.at(0);
      crimeX1 = crime1[0];
      crimeY1 = crime1[1];

      crime2 = graphData.at(1);
      crimeX2 = crime2[0];
      crimeY2 = crime2[1];
    }
    else if (graphData.length == 3){//3 crimeGroups
      crime1 = graphData.at(0);
      crimeX1 = crime1[0];
      crimeY1 = crime1[1];

      crime2 = graphData.at(1);
      crimeX2 = crime2[0];
      crimeY2 = crime2[1];

      crime3 = graphData.at(2);
      crimeX3 = crime3[0];
      crimeY3= crime3[1];
    }
  }
  var covidBar = {
    x: covidX,
    y: covidY,
    type: 'bar',
    mode: 'lines+markers',
    name: 'covidCases',
    marker: {color: 'purple'}
   
  };
  var covidScatter = {
    x: covidX,
    y: covidY,
    type: 'scatter',
    mode: 'lines',
    name: 'scatterCovidCases',
    marker: {color: 'purple'},
    line: {
      dash: 'dot',
      width: 4
    }
   
  };
  var crimeBar1 = {
    x: crimeX1,
    y: crimeY1,
    type: 'bar',
    mode: 'lines+markers',
    name: selectedCrimeGroups[0],
    marker: {color: 'blue'}
  };
  var crimeScatter1 = {
    x: crimeX1,
    y: crimeY1,
    type: 'scatter',
    mode: 'lines',
    name: selectedCrimeGroups[0],
    marker: {color: 'blue'},
    line: {
      dash: 'dot',
      width: 4
    }
  };
  var crimeBar2 = {
    x: crimeX2,
    y: crimeY2,
    type: 'bar',
    mode: 'lines+markers',
    name: selectedCrimeGroups[1],
    marker: {color: 'orange'}
  };
  var crimeScatter2 = {
    x: crimeX2,
    y: crimeY2,
    type: 'scatter',
    mode: 'lines',
    name: selectedCrimeGroups[1],
    marker: {color: 'orange'},
    line: {
      dash: 'dot',
      width: 4
    }
  };
  var crimeBar3 = {
    x: crimeX3,
    y: crimeY3,
    type: 'bar',
    mode: 'lines+markers',
    name: selectedCrimeGroups[2],
    marker: {color: 'yellow'}
  };
  var crimeScatter3 = {
    x: crimeX3,
    y: crimeY3,
    type: 'scatter',
    mode: 'lines',
    name: selectedCrimeGroups[2],
    marker: {color: 'yellow'},
    line: {
      dash: 'dot',
      width: 4
    }
  };

  var layout={
    autosize: false,
    width: 1000,
    height: 600,
    xaxis: {
      title: 'Weeks',
      showticklabels: true,
      autotick: false,
      tickwidth: 2,
      ticklen: 5
    },
    yaxis:{
      title: 'Percentage Change of Cases'
     
    },
  };

  
    var dataset= [covidBar, covidScatter, crimeBar1, crimeScatter1, crimeBar2, crimeScatter2, crimeBar3, crimeScatter3];


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
                  data={dataset}
                  layout={layout}


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