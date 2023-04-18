import "./query2-page.css";
import React, { useCallback, useEffect, useState } from "react";
import Plot from 'react-plotly.js';

import { Box, FormControlLabel, FormControl, FormLabel,
          Select, MenuItem, FormGroup, Checkbox, Divider, 
          Typography, 
          Button }from '@mui/material';
import { useQuery } from "react-query";

const fetchQuery2Data = async ({ queryKey }) => {
  const [_, district, vehicleCrimeTypes] = queryKey;
  console.log(district, vehicleCrimeTypes)
	const res = await fetch("http://localhost:8081/query_2_data" + "?" + (new URLSearchParams({
    district,
    vehicleCrimeTypes,
  }).toString()));
	return res.json();
};

function Template() {
  const [district, setDistrict] = React.useState('');
  const [dataLoading, setDataLoading] = React.useState(false);
  const [graphData, setGraphData] = useState([]);

  const [graphParams, setGraphParams] = useState({
    district: '',
    vehicleCrimeTypes: '',
  });

  const vehicleCrimeTypesNames = [ 'DRIVING WITHOUT OWNER CONSENT (DWOC)',
  'GRAND THEFT / AUTO REPAIR',
  'PETTY THEFT - AUTO REPAIR',
  'RECKLESS DRIVING',
  'SHOTS FIRED AT MOVING VEHICLE, TRAIN OR AIRCRAFT',
  'THEFT FROM MOTOR VEHICLE - ATTEMPT',
  'THEFT FROM MOTOR VEHICLE - GRAND ($950.01 AND OVER)',
  'THEFT FROM MOTOR VEHICLE - PETTY ($950 AND UNDER)',
  'THROWING OBJECT AT MOVING VEHICLE',
  'TRAIN WRECKING',
  'VEHICLE - ATTEMPT STOLEN',
  'VEHICLE - MOTORIZED SCOOTERS, BICYCLES, AND WHEELCHAIRS',
  'VEHICLE - STOLEN',
  'BIKE - STOLEN',
  'BOAT - STOLEN',
  'BURGLARY FROM VEHICLE',
  'BURGLARY FROM VEHICLE, ATTEMPTED'];
  
  const [toggleValues, setToggleValues] = useState(vehicleCrimeTypesNames.map(() => {
    return false
  }));

  const changeDistrict = (event) => {
    setDistrict(event.target.value);
  }

  const { isLoading, error, data } = useQuery(["query2Data", graphParams.district, graphParams.vehicleCrimeTypes], fetchQuery2Data);
  
  const validateInput = () => {
    
  }

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
        selectedValues.push(vehicleCrimeTypesNames[index]);
      }
    })
    if (countTotalSelected == 0 || countTotalSelected > 5) {
      console.log("Error");
    }
    else {
      console.log("passed")
      setGraphData([]);
      console.log(selectedValues);
      setGraphParams({
        district,
        vehicleCrimeTypes: selectedValues.join("#")
      })
      setDataLoading(true);
    }
  }

  return (
    <div className="query-2-page">
      <Box sx={{ flexGrow: 1,  height: 1000}}>
        <h1>
          {dataLoading ? "loading..." : "Transportation Crimes Ratio to Total Crime in L.A. Districts"}</h1>
        <Divider sx={{mb: 1.5, mt: 3, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
          <Typography sx={{color:"#484273", fontSize: 13,}}>
          Transportation crimes and their ratio in relation to all crimes in specific LA districts.
          See how safe a specific area might be for different modes of transportation
          </Typography>
        </Divider>
        <Box sx={{display: 'flex', m:8, mt:0, height:'65%'}}>
          <Box sx={{width: '80%', border: 1, borderColor: 'gray', borderRadius:3}}>
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
              layout={ {width: 1200, height: 600} }
              />
          </Box>
          <Box sx={{display: 'flex', flexDirection:'column', mr:-3, ml:1,}}>
            <h5>DATA FILTERS</h5>
            <p class="hint">select a district and a vehicle crime type</p>
            <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'70%'}}>
              <FormControl fullWidth>
                  <Divider sx={{mb: 1, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
                    <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>
                      Districts*
                    </FormLabel>
                  </Divider>
                <Select value={district} label="district" onChange={changeDistrict}                   
                  sx={{width:'90%', alignSelf:'center', borderRadius:2, height:30, backgroundColor:"#CCBBD0"}}>
                  <MenuItem value={1}>District 1</MenuItem>
                  <MenuItem value={2}>District 2</MenuItem>
                  <MenuItem value={3}>District 3</MenuItem>
                  <MenuItem value={4}>District 4</MenuItem>
                  <MenuItem value={5}>District 5</MenuItem>
                </Select>
                <i>L.A. Districts</i>
                <i>*See Data Page for District Areas</i>
              </FormControl>
            </Box>
            <Box sx={{alignSelf:'center', backgroundColor: '#EAE6EB', borderRadius:2, px:3, py:1, mb:1, width:'70%', maxHeight:'40%', overflowY:"scroll",}}>
              <FormControl fullWidth>
                  <Divider sx={{mb: 0, "&::before, &::after": {borderColor: "#7c76a3",}, }}>
                    <FormLabel sx={{color:'black', fontWeight: 'medium', width:'100%', textAlign: 'center'}}>Vehicle Crime Types*</FormLabel>
                  </Divider>
                  <i class="hint">select up to 5</i>
                <FormGroup>
                  {
                    vehicleCrimeTypesNames.map((name, index) => {
                      return <FormControlLabel control={<Checkbox onChange={(event) => {
                        let temp = toggleValues;
                        temp[index] = event.target.checked;
                        setToggleValues(temp)
                        console.log(toggleValues);
                      }} />} label={<Typography sx={{ fontSize: 14, }}>{name}</Typography>} />
                    })
                  }
                </FormGroup>
                <i>*See Data Page for Crime Types</i>
                <i>**includes (but not limited to: motor vehicles, motorized scooters, bicycles, wheelchairs, etc.)</i>
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
