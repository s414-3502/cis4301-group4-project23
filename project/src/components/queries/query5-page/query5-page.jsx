import "./query5-page.css";
import React, { useEffect, useState } from "react";
import { Button, Box, FormGroup, Checkbox, FormControlLabel, FormControl, Divider, Typography, FormLabel } from '@mui/material';

import Plot from 'react-plotly.js';
import { useQuery } from "react-query";

const fetchQuery5Data = async ({ queryKey }) => {
  const [_,  crimeGroups] = queryKey;
  console.log(crimeGroups)
	const res = await fetch("http://localhost:8081/query_5_data" + "?" + (new URLSearchParams({
    crimeGroups
  }).toString()));
	return res.json();
};

function Template() {
  let col = 1;
  let dataIndex = 0;
  let val = 0;
  const [dataLoading, setDataLoading] = useState(false);
  const [graphData, setGraphData] = useState([]);

  const [graphParams, setGraphParams] = useState({
    crimeGroups: '',
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

  const { isLoading, error, data } = useQuery(["query5Data", graphParams.crimeGroups], fetchQuery5Data);

  useEffect(() => {
    if (data !== undefined) {
      setDataLoading(false);
      setGraphData(data['Data']);
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
        crimeGroups: selectedValues.join("#"),
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

  if(graphData.length > 0){
    val = graphData.at(0);
    console.log("Val: " + val[2]);
  }

  var oneData = {
    name: 'Reported within 30 days',
    x: val[0],
    y: val[1],
    type: 'scatter',
    mode: 'lines+markers',
    marker: {color: scatterColor()},
    line:{
      dash: 'dot'
    }
  }

  var twoData = {
    name: 'Reported after 30 days',
    x: val[0],
    y: val[2],
    type: 'scatter',
    mode: 'lines+markers',
    marker: {color: scatterColor()},
    line:{
      dash: 'dot'
    }
  }

  var dataset = [oneData, twoData];

  return (
    <div className="query-5-page">
      <Box sx={{ flexGrow: 1,  height: 1000}}>
        <h1>{dataLoading ? "loading..." : "Likelihood of Crime being Reported within 30 days"}</h1>
        <Divider sx={{mb: 1.5, mt: 3, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
          <Typography sx={{color:"#484273", fontSize: 13,}}>
            Crime reporting patterns on how often crimes are reported after 
            30 days versus within 30 days
          </Typography>
        </Divider>
        <Box sx={{display: 'flex', justifyContent: 'space-between', m:8, mt:0, ml:1, height:'65%'}}>
          <Box sx={{height:600, border: 1, borderColor: 'gray', borderRadius:3, p:0}}>
            <Plot
                sx={{m:0}}
                data={dataset}
                layout={ {
                  xaxis:{
                    title: "Year"
                  },
                  yaxis:{
                    title: "Percentage"
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
            <p class="hint">select up to 3 crime groupings below</p>
            <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'70%', maxHeight:'100%', overflowY:"scroll",}}>
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
