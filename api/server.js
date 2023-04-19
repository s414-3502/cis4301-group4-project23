var express = require('express');
var app = express();
const fs = require('fs');

// async function fetchDataFromQuery(query) {
//     return JSON.parse(
//         `{"metaData":[{"name":"VEHICLE_RELATED_CRIMES_2010"},{"name":"PERCENTAGE_2010"},{"name":"YEAR_2010"},{"name":"VEHICLE_RELATED_CRIMES_2011"},{"name":"PERCENTAGE_2011"},{"name":"YEAR_2011"},{"name":"VEHICLE_RELATED_CRIMES_2012"},{"name":"PERCENTAGE_2012"},{"name":"YEAR_2012"},{"name":"VEHICLE_RELATED_CRIMES_2013"},{"name":"PERCENTAGE_2013"},{"name":"YEAR_2013"},{"name":"VEHICLE_RELATED_CRIMES_2014"},{"name":"PERCENTAGE_2014"},{"name":"YEAR_2014"},{"name":"VEHICLE_RELATED_CRIMES_2015"},{"name":"PERCENTAGE_2015"},{"name":"YEAR_2015"},{"name":"VEHICLE_RELATED_CRIMES_2016"},{"name":"PERCENTAGE_2016"},{"name":"YEAR_2016"},{"name":"VEHICLE_RELATED_CRIMES_2017"},{"name":"PERCENTAGE_2017"},{"name":"YEAR_2017"},{"name":"VEHICLE_RELATED_CRIMES_2018"},{"name":"PERCENTAGE_2018"},{"name":"YEAR_2018"},{"name":"VEHICLE_RELATED_CRIMES_2019"},{"name":"PERCENTAGE_2019"},{"name":"YEAR_2019"},{"name":"VEHICLE_RELATED_CRIMES_2020"},{"name":"PERCENTAGE_2020"},{"name":"YEAR_2020"},{"name":"VEHICLE_RELATED_CRIMES_2021"},{"name":"PERCENTAGE_2021"},{"name":"YEAR_2021"},{"name":"VEHICLE_RELATED_CRIMES_2022"},{"name":"PERCENTAGE_2022"},{"name":"YEAR_2022"}],"rows":[["BURGLARY FROM VEHICLE",8.32095096582467,2010,"BURGLARY FROM VEHICLE",7.200200702458609,2011,"BURGLARY FROM VEHICLE",6.414201183431949,2012,"BURGLARY FROM VEHICLE",6.980273141122909,2013,"BURGLARY FROM VEHICLE",6.543624161073829,2014,"BURGLARY FROM VEHICLE",5.76235541535226,2015,"BURGLARY FROM VEHICLE",7.44616623062991,2016,"BURGLARY FROM VEHICLE",8.19171281267901,2017,"BURGLARY FROM VEHICLE",9.12525977706405,2018,"BURGLARY FROM VEHICLE",8.805998846375699,2019,"BURGLARY FROM VEHICLE",3.93700787401575,2020,null,0,2021,null,0,2022],["RECKLESS DRIVING",0.024764735017335303,2010,"RECKLESS DRIVING",0.0250878073256397,2011,null,0,2012,null,0,2013,"RECKLESS DRIVING",0.0479386385426654,2014,null,0,2015,null,0,2016,null,0,2017,null,0,2018,null,0,2019,null,0,2020,null,0,2021,null,0,2022]]}`
//     )
// }

const oracledb = require("oracledb");

async function fetchDataFromQuery(query) {
    console.log("fetching connection")
  try {
    let connection = await oracledb.getConnection(
      {
        user: "ananya.agrawal",
        password: "ZmvvaFGzJyksdMiwCk2bItDc",
        connectionString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = oracle.cise.ufl.edu)(PORT = 1521))(CONNECT_DATA=(SID=ORCL)))"
      }
    )
    const data = await connection.execute(query)
    return data
  }

  catch(err){
    console.log(err)
  }
  console.log("Hello!")    
}

async function parseDataFromQuery(query) {
    const output = await fetchDataFromQuery(query);
    let rowCount = output['rows'].length;
    let data = [];

    for (let entry = 0; entry < rowCount; entry++) {
        let X = [];
        let Y = [];
        let rows = output['rows'][entry];
        for (let i = 0; i < output['metaData'].length; i = i + 3) {
            Y.push(rows[i + 1]);
            X.push(rows[i + 2]);
        }
        data.push([X, Y]);
    }
    
    return {
        "Data_Count": rowCount,
        "Data": data
    };
}

function generateQuery2(district, vehicleCrimeTypes) {

    let districtTypeQuery = `AND l.AREA = d${district}.AREA`
    let  vehicleCrimeTypesQuery = "l.CRM_CD_DESC = '" + vehicleCrimeTypes.split("#").join("' OR l.CRM_CD_DESC = '") + "'";

    let query_2 = `--Query 2
    WITH VEHICLE_CRIMES AS
        (SELECT DISTINCT l.CRM_CD_DESC
        FROM WGREGORY.LA_CRIMES l
        WHERE
        ${vehicleCrimeTypesQuery}
--    l.CRM_CD_DESC = 'DRIVING WITHOUT OWNER CONSENT (DWOC)'
    --    OR l.CRM_CD_DESC = 'GRAND THEFT / AUTO REPAIR'
    --    OR l.CRM_CD_DESC = 'PETTY THEFT - AUTO REPAIR'
    --    OR l.CRM_CD_DESC = 'RECKLESS DRIVING'
    --    OR l.CRM_CD_DESC = 'SHOTS FIRED AT MOVING VEHICLE, TRAIN OR AIRCRAFT'
    --    OR l.CRM_CD_DESC = 'THEFT FROM MOTOR VEHICLE - ATTEMPT'
    --    OR l.CRM_CD_DESC = 'THEFT FROM MOTOR VEHICLE - GRAND ($950.01 AND OVER)'
    --    OR l.CRM_CD_DESC = 'THEFT FROM MOTOR VEHICLE - PETTY ($950 ' || chr(38) || ' UNDER)'
    --    OR l.CRM_CD_DESC = 'THROWING OBJECT AT MOVING VEHICLE'
    --    OR l.CRM_CD_DESC = 'TRAIN WRECKING'
    --    OR l.CRM_CD_DESC = 'VEHICLE - ATTEMPT STOLEN'
    --    OR l.CRM_CD_DESC = 'VEHICLE - MOTORIZED SCOOTERS, BICYCLES, AND WHEELCHAIRS'
    --    OR l.CRM_CD_DESC = 'VEHICLE - STOLEN'
    --    OR l.CRM_CD_DESC = 'BIKE - STOLEN'
    --    OR l.CRM_CD_DESC = 'BOAT - STOLEN'
    --    OR l.CRM_CD_DESC = 'BURGLARY FROM VEHICLE'
    --    OR l.CRM_CD_DESC = 'BURGLARY FROM VEHICLE, ATTEMPTED'
        ),
        DISTRICT_1 AS
        (SELECT DISTINCT l.AREA
        FROM WGREGORY.LA_CRIMES l
        WHERE l.AREA = 1 OR l.AREA = 2 OR l.AREA = 4 OR l.AREA = 11
        ),
        DISTRICT_2 AS
        (SELECT DISTINCT l.AREA
        FROM WGREGORY.LA_CRIMES l
        WHERE l.AREA = 3 OR l.AREA = 12 OR l.AREA = 13 OR l.AREA = 14 OR l.AREA = 18 OR l.AREA = 20
        ),
        DISTRICT_3 AS
        (SELECT DISTINCT l.AREA
        FROM WGREGORY.LA_CRIMES l
        WHERE l.AREA = 6 OR l.AREA = 7 OR l.AREA = 8 OR l.AREA = 9 OR l.AREA = 10 OR l.AREA = 16 OR l.AREA = 17 OR l.AREA = 19 OR l.AREA = 21
        ),
        DISTRICT_4 AS
        (SELECT DISTINCT l.AREA
        FROM WGREGORY.LA_CRIMES l
        WHERE l.AREA = 5
        ),
        DISTRICT_5 AS
        (SELECT DISTINCT l.AREA
        FROM WGREGORY.LA_CRIMES l
        WHERE l.AREA = 15
        )
    SELECT DISTINCT r10.VEHICLE_RELATED_CRIMES_2010, NVL(r10.PERCENTAGE_2010, 0) AS PERCENTAGE_2010, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2010')) AS YEAR_2010, r11.VEHICLE_RELATED_CRIMES_2011, NVL(r11.PERCENTAGE_2011, 0) AS PERCENTAGE_2011, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2011')) AS YEAR_2011, r12.VEHICLE_RELATED_CRIMES_2012, NVL(r12.PERCENTAGE_2012, 0) AS PERCENTAGE_2012, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2012')) AS YEAR_2012, r13.VEHICLE_RELATED_CRIMES_2013, NVL(r13.PERCENTAGE_2013, 0) AS PERCENTAGE_2013, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2013')) AS YEAR_2013, r14.VEHICLE_RELATED_CRIMES_2014, NVL(r14.PERCENTAGE_2014, 0) AS PERCENTAGE_2014, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2014')) AS YEAR_2014, r15.VEHICLE_RELATED_CRIMES_2015, NVL(r15.PERCENTAGE_2015, 0) AS PERCENTAGE_2015, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2015')) AS YEAR_2015, r16.VEHICLE_RELATED_CRIMES_2016, NVL(r16.PERCENTAGE_2016, 0) AS PERCENTAGE_2016, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2016')) AS YEAR_2016, r17.VEHICLE_RELATED_CRIMES_2017, NVL(r17.PERCENTAGE_2017, 0) AS PERCENTAGE_2017, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2017')) AS YEAR_2017, r18.VEHICLE_RELATED_CRIMES_2018, NVL(r18.PERCENTAGE_2018, 0) AS PERCENTAGE_2018, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2018')) AS YEAR_2018, r19.VEHICLE_RELATED_CRIMES_2019 AS VEHICLE_RELATED_CRIMES_2019, NVL(r19.PERCENTAGE_2019, 0) AS PERCENTAGE_2019, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2019')) AS YEAR_2019, r20.VEHICLE_RELATED_CRIMES_2020 AS VEHICLE_RELATED_CRIMES_2020, NVL(r20.PERCENTAGE_2020, 0) AS PERCENTAGE_2020, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2020')) AS YEAR_2020, r21.VEHICLE_RELATED_CRIMES_2021 AS VEHICLE_RELATED_CRIMES_2021, NVL(r21.PERCENTAGE_2021, 0) AS PERCENTAGE_2021, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2021')) AS YEAR_2021, r22.VEHICLE_RELATED_CRIMES_2022 AS VEHICLE_RELATED_CRIMES_2022, NVL(r22.PERCENTAGE_2022, 0) AS PERCENTAGE_2022, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2022')) AS YEAR_2022
    FROM WGREGORY.LA_CRIMES l,
        WGREGORY.VEHICLE_CRIMES vc
        LEFT JOIN
        (SELECT DISTINCT c.CRIME AS VEHICLE_RELATED_CRIMES_2010, ((c.OCCURRENCE / s.SUMMATION) * 100) AS PERCENTAGE_2010
        FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5
                WHERE l.DATE_RPTD >= '01-JAN-2010' AND l.DATE_RPTD <= '31-DEC-2010' AND l.DATE_RPTD IS NOT NULL
                --District selection from filter would go here as one of these:
                 ${districtTypeQuery}
    --            AND l.AREA = d1.AREA
                --AND l.AREA = d2.AREA
                --AND l.AREA = d3.AREA
                --AND l.AREA = d4.AREA
                --AND l.AREA = d5.AREA
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5 
            WHERE l.DATE_RPTD >= '01-JAN-2010' AND l.DATE_RPTD <= '31-DEC-2010' AND l.DATE_RPTD IS NOT NULL
            AND l.CRM_CD_DESC = vc.CRM_CD_DESC
            --District selection from filter would go here as one of these:
             ${districtTypeQuery}
    --        AND l.AREA = d1.AREA
            --AND l.AREA = d2.AREA
            --AND l.AREA = d3.AREA
            --AND l.AREA = d4.AREA
            --AND l.AREA = d5.AREA
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = l.CRM_CD_DESC AND l.DATE_RPTD >= '01-JAN-2010' AND l.DATE_RPTD <= '31-DEC-2010' AND l.DATE_RPTD IS NOT NULL
        ) r10 ON vc.CRM_CD_DESC = r10.VEHICLE_RELATED_CRIMES_2010
        LEFT JOIN
        (SELECT DISTINCT c.CRIME AS VEHICLE_RELATED_CRIMES_2011, ((c.OCCURRENCE / s.SUMMATION) * 100) AS PERCENTAGE_2011
        FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5
                WHERE l.DATE_RPTD >= '01-JAN-2011' AND l.DATE_RPTD <= '31-DEC-2011' AND l.DATE_RPTD IS NOT NULL
                --District selection from filter would go here as one of these:
                 ${districtTypeQuery}
    --            AND l.AREA = d1.AREA
                --AND l.AREA = d2.AREA
                --AND l.AREA = d3.AREA
                --AND l.AREA = d4.AREA
                --AND l.AREA = d5.AREA
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5 
            WHERE l.DATE_RPTD >= '01-JAN-2011' AND l.DATE_RPTD <= '31-DEC-2011' AND l.DATE_RPTD IS NOT NULL
            AND l.CRM_CD_DESC = vc.CRM_CD_DESC
            --District selection from filter would go here as one of these:
             ${districtTypeQuery}
    --        AND l.AREA = d1.AREA
            --AND l.AREA = d2.AREA
            --AND l.AREA = d3.AREA
            --AND l.AREA = d4.AREA
            --AND l.AREA = d5.AREA
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = l.CRM_CD_DESC AND l.DATE_RPTD >= '01-JAN-2011' AND l.DATE_RPTD <= '31-DEC-2011' AND l.DATE_RPTD IS NOT NULL
        ) r11 ON vc.CRM_CD_DESC = r11.VEHICLE_RELATED_CRIMES_2011
        LEFT JOIN
        (SELECT DISTINCT c.CRIME AS VEHICLE_RELATED_CRIMES_2012, ((c.OCCURRENCE / s.SUMMATION) * 100) AS PERCENTAGE_2012
        FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5
                WHERE l.DATE_RPTD >= '01-JAN-2012' AND l.DATE_RPTD <= '31-DEC-2012' AND l.DATE_RPTD IS NOT NULL
                --District selection from filter would go here as one of these:
                 ${districtTypeQuery}
    --            AND l.AREA = d1.AREA
                --AND l.AREA = d2.AREA
                --AND l.AREA = d3.AREA
                --AND l.AREA = d4.AREA
                --AND l.AREA = d5.AREA
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5 
            WHERE l.DATE_RPTD >= '01-JAN-2012' AND l.DATE_RPTD <= '31-DEC-2012' AND l.DATE_RPTD IS NOT NULL
            AND l.CRM_CD_DESC = vc.CRM_CD_DESC
            --District selection from filter would go here as one of these:
             ${districtTypeQuery}
    --        AND l.AREA = d1.AREA
            --AND l.AREA = d2.AREA
            --AND l.AREA = d3.AREA
            --AND l.AREA = d4.AREA
            --AND l.AREA = d5.AREA
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = l.CRM_CD_DESC AND l.DATE_RPTD >= '01-JAN-2012' AND l.DATE_RPTD <= '31-DEC-2012' AND l.DATE_RPTD IS NOT NULL
        ) r12 ON vc.CRM_CD_DESC = r12.VEHICLE_RELATED_CRIMES_2012
        LEFT JOIN
        (SELECT DISTINCT c.CRIME AS VEHICLE_RELATED_CRIMES_2013, ((c.OCCURRENCE / s.SUMMATION) * 100) AS PERCENTAGE_2013
        FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5
                WHERE l.DATE_RPTD >= '01-JAN-2013' AND l.DATE_RPTD <= '31-DEC-2013' AND l.DATE_RPTD IS NOT NULL
                --District selection from filter would go here as one of these:
                 ${districtTypeQuery}
    --            AND l.AREA = d1.AREA
                --AND l.AREA = d2.AREA
                --AND l.AREA = d3.AREA
                --AND l.AREA = d4.AREA
                --AND l.AREA = d5.AREA
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5 
            WHERE l.DATE_RPTD >= '01-JAN-2013' AND l.DATE_RPTD <= '31-DEC-2013' AND l.DATE_RPTD IS NOT NULL
            AND l.CRM_CD_DESC = vc.CRM_CD_DESC
            --District selection from filter would go here as one of these:
             ${districtTypeQuery}
    --        AND l.AREA = d1.AREA
            --AND l.AREA = d2.AREA
            --AND l.AREA = d3.AREA
            --AND l.AREA = d4.AREA
            --AND l.AREA = d5.AREA
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = l.CRM_CD_DESC AND l.DATE_RPTD >= '01-JAN-2013' AND l.DATE_RPTD <= '31-DEC-2013' AND l.DATE_RPTD IS NOT NULL
        ) r13 ON vc.CRM_CD_DESC = r13.VEHICLE_RELATED_CRIMES_2013
        LEFT JOIN
        (SELECT DISTINCT c.CRIME AS VEHICLE_RELATED_CRIMES_2014, ((c.OCCURRENCE / s.SUMMATION) * 100) AS PERCENTAGE_2014
        FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5
                WHERE l.DATE_RPTD >= '01-JAN-2014' AND l.DATE_RPTD <= '31-DEC-2014' AND l.DATE_RPTD IS NOT NULL
                --District selection from filter would go here as one of these:
                 ${districtTypeQuery}
    --            AND l.AREA = d1.AREA
                --AND l.AREA = d2.AREA
                --AND l.AREA = d3.AREA
                --AND l.AREA = d4.AREA
                --AND l.AREA = d5.AREA
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5 
            WHERE l.DATE_RPTD >= '01-JAN-2014' AND l.DATE_RPTD <= '31-DEC-2014' AND l.DATE_RPTD IS NOT NULL
            AND l.CRM_CD_DESC = vc.CRM_CD_DESC
            --District selection from filter would go here as one of these:
             ${districtTypeQuery}
    --        AND l.AREA = d1.AREA
            --AND l.AREA = d2.AREA
            --AND l.AREA = d3.AREA
            --AND l.AREA = d4.AREA
            --AND l.AREA = d5.AREA
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = l.CRM_CD_DESC AND l.DATE_RPTD >= '01-JAN-2014' AND l.DATE_RPTD <= '31-DEC-2014' AND l.DATE_RPTD IS NOT NULL
        ) r14 ON vc.CRM_CD_DESC = r14.VEHICLE_RELATED_CRIMES_2014
        LEFT JOIN
        (SELECT DISTINCT c.CRIME AS VEHICLE_RELATED_CRIMES_2015, ((c.OCCURRENCE / s.SUMMATION) * 100) AS PERCENTAGE_2015
        FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5
                WHERE l.DATE_RPTD >= '01-JAN-2015' AND l.DATE_RPTD <= '31-DEC-2015' AND l.DATE_RPTD IS NOT NULL
                --District selection from filter would go here as one of these:
                 ${districtTypeQuery}
    --            AND l.AREA = d1.AREA
                --AND l.AREA = d2.AREA
                --AND l.AREA = d3.AREA
                --AND l.AREA = d4.AREA
                --AND l.AREA = d5.AREA
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5 
            WHERE l.DATE_RPTD >= '01-JAN-2015' AND l.DATE_RPTD <= '31-DEC-2015' AND l.DATE_RPTD IS NOT NULL
            AND l.CRM_CD_DESC = vc.CRM_CD_DESC
            --District selection from filter would go here as one of these:
             ${districtTypeQuery}
    --        AND l.AREA = d1.AREA
            --AND l.AREA = d2.AREA
            --AND l.AREA = d3.AREA
            --AND l.AREA = d4.AREA
            --AND l.AREA = d5.AREA
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = l.CRM_CD_DESC AND l.DATE_RPTD >= '01-JAN-2015' AND l.DATE_RPTD <= '31-DEC-2015' AND l.DATE_RPTD IS NOT NULL
        ) r15 ON vc.CRM_CD_DESC = r15.VEHICLE_RELATED_CRIMES_2015
        LEFT JOIN
        (SELECT DISTINCT c.CRIME AS VEHICLE_RELATED_CRIMES_2016, ((c.OCCURRENCE / s.SUMMATION) * 100) AS PERCENTAGE_2016
        FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5
                WHERE l.DATE_RPTD >= '01-JAN-2016' AND l.DATE_RPTD <= '31-DEC-2016' AND l.DATE_RPTD IS NOT NULL
                --District selection from filter would go here as one of these:
                 ${districtTypeQuery}
    --            AND l.AREA = d1.AREA
                --AND l.AREA = d2.AREA
                --AND l.AREA = d3.AREA
                --AND l.AREA = d4.AREA
                --AND l.AREA = d5.AREA
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5 
            WHERE l.DATE_RPTD >= '01-JAN-2016' AND l.DATE_RPTD <= '31-DEC-2016' AND l.DATE_RPTD IS NOT NULL
            AND l.CRM_CD_DESC = vc.CRM_CD_DESC
            --District selection from filter would go here as one of these:
             ${districtTypeQuery}
    --        AND l.AREA = d1.AREA
            --AND l.AREA = d2.AREA
            --AND l.AREA = d3.AREA
            --AND l.AREA = d4.AREA
            --AND l.AREA = d5.AREA
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = l.CRM_CD_DESC AND l.DATE_RPTD >= '01-JAN-2016' AND l.DATE_RPTD <= '31-DEC-2016' AND l.DATE_RPTD IS NOT NULL
        ) r16 ON vc.CRM_CD_DESC = r16.VEHICLE_RELATED_CRIMES_2016
        LEFT JOIN
        (SELECT DISTINCT c.CRIME AS VEHICLE_RELATED_CRIMES_2017, ((c.OCCURRENCE / s.SUMMATION) * 100) AS PERCENTAGE_2017
        FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5
                WHERE l.DATE_RPTD >= '01-JAN-2017' AND l.DATE_RPTD <= '31-DEC-2017' AND l.DATE_RPTD IS NOT NULL
                --District selection from filter would go here as one of these:
                 ${districtTypeQuery}
    --            AND l.AREA = d1.AREA
                --AND l.AREA = d2.AREA
                --AND l.AREA = d3.AREA
                --AND l.AREA = d4.AREA
                --AND l.AREA = d5.AREA
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5 
            WHERE l.DATE_RPTD >= '01-JAN-2017' AND l.DATE_RPTD <= '31-DEC-2017' AND l.DATE_RPTD IS NOT NULL
            AND l.CRM_CD_DESC = vc.CRM_CD_DESC
            --District selection from filter would go here as one of these:
             ${districtTypeQuery}
    --        AND l.AREA = d1.AREA
            --AND l.AREA = d2.AREA
            --AND l.AREA = d3.AREA
            --AND l.AREA = d4.AREA
            --AND l.AREA = d5.AREA
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = l.CRM_CD_DESC AND l.DATE_RPTD >= '01-JAN-2017' AND l.DATE_RPTD <= '31-DEC-2017' AND l.DATE_RPTD IS NOT NULL
        ) r17 ON vc.CRM_CD_DESC = r17.VEHICLE_RELATED_CRIMES_2017
        LEFT JOIN
        (SELECT DISTINCT c.CRIME AS VEHICLE_RELATED_CRIMES_2018, ((c.OCCURRENCE / s.SUMMATION) * 100) AS PERCENTAGE_2018
        FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5
                WHERE l.DATE_RPTD >= '01-JAN-2018' AND l.DATE_RPTD <= '31-DEC-2018' AND l.DATE_RPTD IS NOT NULL
                --District selection from filter would go here as one of these:
                 ${districtTypeQuery}
    --            AND l.AREA = d1.AREA
                --AND l.AREA = d2.AREA
                --AND l.AREA = d3.AREA
                --AND l.AREA = d4.AREA
                --AND l.AREA = d5.AREA
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5
            WHERE l.DATE_RPTD >= '01-JAN-2018' AND l.DATE_RPTD <= '31-DEC-2018' AND l.DATE_RPTD IS NOT NULL
            AND l.CRM_CD_DESC = vc.CRM_CD_DESC
            --District selection from filter would go here as one of these:
             ${districtTypeQuery}
    --        AND l.AREA = d1.AREA
            --AND l.AREA = d2.AREA
            --AND l.AREA = d3.AREA
            --AND l.AREA = d4.AREA
            --AND l.AREA = d5.AREA
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = l.CRM_CD_DESC AND l.DATE_RPTD >= '01-JAN-2018' AND l.DATE_RPTD <= '31-DEC-2018' AND l.DATE_RPTD IS NOT NULL
        ) r18 ON vc.CRM_CD_DESC = r18.VEHICLE_RELATED_CRIMES_2018
        LEFT JOIN
        (SELECT DISTINCT c.CRIME AS VEHICLE_RELATED_CRIMES_2019, ((c.OCCURRENCE / s.SUMMATION) * 100) AS PERCENTAGE_2019
        FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5
                WHERE l.DATE_RPTD >= '01-JAN-2019' AND l.DATE_RPTD <= '31-DEC-2019' AND l.DATE_RPTD IS NOT NULL
                --District selection from filter would go here as one of these:
                 ${districtTypeQuery}
    --            AND l.AREA = d1.AREA
                --AND l.AREA = d2.AREA
                --AND l.AREA = d3.AREA
                --AND l.AREA = d4.AREA
                --AND l.AREA = d5.AREA
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5
            WHERE l.DATE_RPTD >= '01-JAN-2019' AND l.DATE_RPTD <= '31-DEC-2019' AND l.DATE_RPTD IS NOT NULL
            AND l.CRM_CD_DESC = vc.CRM_CD_DESC
            --District selection from filter would go here as one of these:
             ${districtTypeQuery}
    --        AND l.AREA = d1.AREA
            --AND l.AREA = d2.AREA
            --AND l.AREA = d3.AREA
            --AND l.AREA = d4.AREA
            --AND l.AREA = d5.AREA
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = l.CRM_CD_DESC AND l.DATE_RPTD >= '01-JAN-2019' AND l.DATE_RPTD <= '31-DEC-2019' AND l.DATE_RPTD IS NOT NULL
        ) r19 ON vc.CRM_CD_DESC = r19.VEHICLE_RELATED_CRIMES_2019
        LEFT JOIN
        (SELECT DISTINCT c.CRIME AS VEHICLE_RELATED_CRIMES_2020, ((c.OCCURRENCE / s.SUMMATION) * 100) AS PERCENTAGE_2020
        FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5
                WHERE l.DATE_RPTD >= '01-JAN-2020' AND l.DATE_RPTD <= '31-DEC-2020' AND l.DATE_RPTD IS NOT NULL
                --District selection from filter would go here as one of these:
                 ${districtTypeQuery}
    --            AND l.AREA = d1.AREA
                --AND l.AREA = d2.AREA
                --AND l.AREA = d3.AREA
                --AND l.AREA = d4.AREA
                --AND l.AREA = d5.AREA
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5
            WHERE l.DATE_RPTD >= '01-JAN-2020' AND l.DATE_RPTD <= '31-DEC-2020' AND l.DATE_RPTD IS NOT NULL
            AND l.CRM_CD_DESC = vc.CRM_CD_DESC
            --District selection from filter would go here as one of these:
             ${districtTypeQuery}
    --        AND l.AREA = d1.AREA
            --AND l.AREA = d2.AREA
            --AND l.AREA = d3.AREA
            --AND l.AREA = d4.AREA
            --AND l.AREA = d5.AREA
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = l.CRM_CD_DESC AND l.DATE_RPTD >= '01-JAN-2020' AND l.DATE_RPTD <= '31-DEC-2020' AND l.DATE_RPTD IS NOT NULL
        ) r20 ON vc.CRM_CD_DESC = r20.VEHICLE_RELATED_CRIMES_2020
        LEFT JOIN
        (SELECT DISTINCT c.CRIME AS VEHICLE_RELATED_CRIMES_2021, ((c.OCCURRENCE / s.SUMMATION) * 100) AS PERCENTAGE_2021
        FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5
                WHERE l.DATE_RPTD >= '01-JAN-2021' AND l.DATE_RPTD <= '31-DEC-2021' AND l.DATE_RPTD IS NOT NULL
                --District selection from filter would go here as one of these:
                 ${districtTypeQuery}
    --            AND l.AREA = d1.AREA
                --AND l.AREA = d2.AREA
                --AND l.AREA = d3.AREA
                --AND l.AREA = d4.AREA
                --AND l.AREA = d5.AREA
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5
            WHERE l.DATE_RPTD >= '01-JAN-2021' AND l.DATE_RPTD <= '31-DEC-2021' AND l.DATE_RPTD IS NOT NULL
            AND l.CRM_CD_DESC = vc.CRM_CD_DESC
            --District selection from filter would go here as one of these:
             ${districtTypeQuery}
    --        AND l.AREA = d1.AREA
            --AND l.AREA = d2.AREA
            --AND l.AREA = d3.AREA
            --AND l.AREA = d4.AREA
            --AND l.AREA = d5.AREA
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = l.CRM_CD_DESC AND l.DATE_RPTD >= '01-JAN-2021' AND l.DATE_RPTD <= '31-DEC-2021' AND l.DATE_RPTD IS NOT NULL
        ) r21 ON vc.CRM_CD_DESC = r21.VEHICLE_RELATED_CRIMES_2021
        LEFT JOIN
        (SELECT DISTINCT c.CRIME AS VEHICLE_RELATED_CRIMES_2022, ((c.OCCURRENCE / s.SUMMATION) * 100) AS PERCENTAGE_2022
        FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5
                WHERE l.DATE_RPTD >= '01-JAN-2022' AND l.DATE_RPTD <= '31-DEC-2022' AND l.DATE_RPTD IS NOT NULL
                --District selection from filter would go here as one of these:
                 ${districtTypeQuery}
    --            AND l.AREA = d1.AREA
                --AND l.AREA = d2.AREA
                --AND l.AREA = d3.AREA
                --AND l.AREA = d4.AREA
                --AND l.AREA = d5.AREA
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l, WGREGORY.VEHICLE_CRIMES vc, WGREGORY.DISTRICT_1 d1, WGREGORY.DISTRICT_2 d2, WGREGORY.DISTRICT_3 d3, WGREGORY.DISTRICT_4 d4, WGREGORY.DISTRICT_5 d5
            WHERE l.DATE_RPTD >= '01-JAN-2022' AND l.DATE_RPTD <= '31-DEC-2022' AND l.DATE_RPTD IS NOT NULL
            --District selection from filter would go here as one of these:
             ${districtTypeQuery}
    --        AND l.AREA = d1.AREA
            --AND l.AREA = d2.AREA
            --AND l.AREA = d3.AREA
            --AND l.AREA = d4.AREA
            --AND l.AREA = d5.AREA
            AND l.CRM_CD_DESC = vc.CRM_CD_DESC
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = l.CRM_CD_DESC AND l.DATE_RPTD >= '01-JAN-2022' AND l.DATE_RPTD <= '31-DEC-2022' AND l.DATE_RPTD IS NOT NULL
        ) r22 ON vc.CRM_CD_DESC = r22.VEHICLE_RELATED_CRIMES_2022  `

        fs.writeFile('test.txt', query_2, err => {
            if (err) {
              console.error(err);
            }
            // file written successfully
          });
    return query_2
}

function generateQuery3(sex, descent, ageStart, ageEnd) {

    let sexQuery = `AND l.VICT_SEX = '${sex}'`
    let descentQuery = `AND l.VICT_DESCENT = '${descent}'`
    let ageQuery = `AND l.VICT_AGE >= ${ageStart} AND l.VICT_AGE <= ${ageEnd}`

    let query_3 = `--Query 3
    WITH CRIME_COUNT AS
        (SELECT DISTINCT r.MOST_COMMON_CRIME, r.RATIO_RANGE
        FROM WGREGORY.LA_CRIMES l,
            (SELECT DISTINCT c.CRIME AS MOST_COMMON_CRIME, MAX(c.OCCURRENCE / s.SUMMATION) AS RATIO_RANGE
            FROM WGREGORY.LA_CRIMES l,
                (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
                FROM 
                    (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                    FROM WGREGORY.LA_CRIMES l
                    WHERE l.DATE_RPTD >= '01-JAN-2010' AND l.DATE_RPTD <= '31-DEC-2022' AND l.DATE_RPTD IS NOT NULL
                    GROUP BY l.CRM_CD_DESC
                    ) c
                ) s,
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l
                WHERE l.DATE_RPTD >= '01-JAN-2010' AND l.DATE_RPTD <= '31-DEC-2022' AND l.DATE_RPTD IS NOT NULL
                --Filter for Sex here
                ${sexQuery}
    --            AND l.VICT_SEX = 'M'
                --AND l.VICT_SEX = 'F'
                --AND l.VICT_SEX = 'X'
                
                --Filter for Descent here (Place ( after AND, then OR l.VICT_DESCENT = '' after AND ( l.VICT_DESCENT = '' to account for combinations Then end line with ).
                ${descentQuery}
                --AND l.VICT_DESCENT = 'X'
    --            AND l.VICT_DESCENT = 'B'
                --AND l.VICT_DESCENT = 'F'
    --            AND l.VICT_DESCENT = 'V'
                --AND l.VICT_DESCENT = 'O'
                --AND l.VICT_DESCENT = 'K'
                --AND l.VICT_DESCENT = 'H'
    --            AND l.VICT_DESCENT = 'W'
                --AND l.VICT_DESCENT = 'C'
                --AND l.VICT_DESCENT = 'U'
                --AND l.VICT_DESCENT = 'I'
                --AND l.VICT_DESCENT = 'A'
                --AND l.VICT_DESCENT = 'P'
                --AND l.VICT_DESCENT = 'J'
                --AND l.VICT_DESCENT = 'Z'
                --AND l.VICT_DESCENT = 'D'
                --AND l.VICT_DESCENT = 'G'
                --AND l.VICT_DESCENT = 'L'
                --AND l.VICT_DESCENT = 'S'
                
                --Filter for Age. (I assume the slider will be used to shift the numbers used here)
                ${ageQuery}
    --            AND l.VICT_AGE >= 18
                --AND l.VICT_AGE <= 99
                GROUP BY l.CRM_CD_DESC
                ) c
            WHERE l.CRM_CD_DESC = c.CRIME AND l.DATE_RPTD >= '01-JAN-2010' AND l.DATE_RPTD <= '31-DEC-2022' AND l.DATE_RPTD IS NOT NULL
            GROUP BY c.CRIME
            ORDER BY RATIO_RANGE DESC
            FETCH FIRST 5 ROWS ONLY
            ) r
        WHERE l.CRM_CD_DESC = r.MOST_COMMON_CRIME
        )
    SELECT DISTINCT r10.MOST_COMMON_CRIMES_2010, NVL(r10.RATIO_2010, 0) AS RATIO_2010, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2010')) AS YEAR_2010, r11.MOST_COMMON_CRIMES_2011, NVL(r11.RATIO_2011, 0) AS RATIO_2011, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2011')) AS YEAR_2011, r12.MOST_COMMON_CRIMES_2012, NVL(r12.RATIO_2012, 0) AS RATIO_2012, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2012')) AS YEAR_2012,  r13.MOST_COMMON_CRIMES_2013, NVL(r13.RATIO_2013, 0) AS RATIO_2013, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2013')) AS YEAR_2013, r14.MOST_COMMON_CRIMES_2014, NVL(r14.RATIO_2014, 0) AS RATIO_2014, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2014')) AS YEAR_2014, r15.MOST_COMMON_CRIMES_2015, NVL(r15.RATIO_2015, 0) AS RATIO_2015, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2015')) AS YEAR_2015, r16.MOST_COMMON_CRIMES_2016, NVL(r16.RATIO_2016, 0) AS RATIO_2016, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2016')) AS YEAR_2016, r17.MOST_COMMON_CRIMES_2017, NVL(r17.RATIO_2017, 0) AS RATIO_2017, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2017')) AS YEAR_2017, r18.MOST_COMMON_CRIMES_2018, NVL(r18.RATIO_2018, 0) AS RATIO_2018, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2018')) AS YEAR_2018, r19.MOST_COMMON_CRIMES_2019, NVL(r19.RATIO_2019, 0) AS RATIO_2019, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2019')) AS YEAR_2019, r20.MOST_COMMON_CRIMES_2020, NVL(r20.RATIO_2020, 0) AS RATIO_2020, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2020')) AS YEAR_2020, r21.MOST_COMMON_CRIMES_2021, NVL(r21.RATIO_2021, 0) AS RATIO_2021, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2021')) AS YEAR_2021, r22.MOST_COMMON_CRIMES_2022, NVL(r22.RATIO_2022, 0) AS RATIO_2022, EXTRACT(YEAR FROM TO_DATE ('01-JAN-2022')) AS YEAR_2022
    FROM WGREGORY.CRIME_COUNT cc FULL JOIN WGREGORY.LA_CRIMES l ON l.CRM_CD_DESC = cc.MOST_COMMON_CRIME
    FULL JOIN
        (SELECT DISTINCT c.CRIME AS MOST_COMMON_CRIMES_2010, (c.OCCURRENCE / s.SUMMATION) AS RATIO_2010
        FROM WGREGORY.LA_CRIMES l, WGREGORY.CRIME_COUNT cc,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l
                WHERE l.DATE_RPTD >= '01-JAN-2010' AND l.DATE_RPTD <= '31-DEC-2010' AND l.DATE_RPTD IS NOT NULL
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l
            WHERE l.DATE_RPTD >= '01-JAN-2010' AND l.DATE_RPTD <= '31-DEC-2010' AND l.DATE_RPTD IS NOT NULL
            --Filter for Sex here
            ${sexQuery}
    --        AND l.VICT_SEX = 'M'
            --AND l.VICT_SEX = 'F'
            --AND l.VICT_SEX = 'X'
            
            --Filter for Descent here (Place ( after AND, then OR l.VICT_DESCENT = '' after AND ( l.VICT_DESCENT = '' to account for combinations Then end line with ).
            ${descentQuery}
                --AND l.VICT_DESCENT = 'X'
    --            AND l.VICT_DESCENT = 'B'
                --AND l.VICT_DESCENT = 'F'
                --AND l.VICT_DESCENT = 'V'
                --AND l.VICT_DESCENT = 'O'
                --AND l.VICT_DESCENT = 'K'
                --AND l.VICT_DESCENT = 'H'
    --            AND l.VICT_DESCENT = 'W'
                --AND l.VICT_DESCENT = 'C'
                --AND l.VICT_DESCENT = 'U'
                --AND l.VICT_DESCENT = 'I'
                --AND l.VICT_DESCENT = 'A'
                --AND l.VICT_DESCENT = 'P'
                --AND l.VICT_DESCENT = 'J'
                --AND l.VICT_DESCENT = 'Z'
                --AND l.VICT_DESCENT = 'D'
                --AND l.VICT_DESCENT = 'G'
                --AND l.VICT_DESCENT = 'L'
                --AND l.VICT_DESCENT = 'S'
            
            --Filter for Age. (I assume the slider will be used to shift the numbers used here)
            ${ageQuery}
    --        AND l.VICT_AGE >= 18
            --AND l.VICT_AGE <= 99
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = cc.MOST_COMMON_CRIME AND l.DATE_RPTD >= '01-JAN-2010' AND l.DATE_RPTD <= '31-DEC-2010' AND l.DATE_RPTD IS NOT NULL
        ORDER BY RATIO_2010 DESC
        FETCH FIRST 5 ROWS ONLY
        ) r10 ON l.CRM_CD_DESC = r10.MOST_COMMON_CRIMES_2010
    FULL JOIN
        (SELECT DISTINCT c.CRIME AS MOST_COMMON_CRIMES_2011, (c.OCCURRENCE / s.SUMMATION) AS RATIO_2011
        FROM WGREGORY.LA_CRIMES l, WGREGORY.CRIME_COUNT cc,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l
                WHERE l.DATE_RPTD >= '01-JAN-2011' AND l.DATE_RPTD <= '31-DEC-2011' AND l.DATE_RPTD IS NOT NULL
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l
            WHERE l.DATE_RPTD >= '01-JAN-2011' AND l.DATE_RPTD <= '31-DEC-2011' AND l.DATE_RPTD IS NOT NULL 
            --Filter for Sex here
            ${sexQuery}
    --        AND l.VICT_SEX = 'M'
            --AND l.VICT_SEX = 'F'
            --AND l.VICT_SEX = 'X'
            
            --Filter for Descent here (Place ( after AND, then OR l.VICT_DESCENT = '' after AND ( l.VICT_DESCENT = '' to account for combinations Then end line with ).
            ${descentQuery}
                --AND l.VICT_DESCENT = 'X'
    --            AND l.VICT_DESCENT = 'B'
                --AND l.VICT_DESCENT = 'F'
                --AND l.VICT_DESCENT = 'V'
                --AND l.VICT_DESCENT = 'O'
                --AND l.VICT_DESCENT = 'K'
                --AND l.VICT_DESCENT = 'H'
    --            AND l.VICT_DESCENT = 'W'
                --AND l.VICT_DESCENT = 'C'
                --AND l.VICT_DESCENT = 'U'
                --AND l.VICT_DESCENT = 'I'
                --AND l.VICT_DESCENT = 'A'
                --AND l.VICT_DESCENT = 'P'
                --AND l.VICT_DESCENT = 'J'
                --AND l.VICT_DESCENT = 'Z'
                --AND l.VICT_DESCENT = 'D'
                --AND l.VICT_DESCENT = 'G'
                --AND l.VICT_DESCENT = 'L'
                --AND l.VICT_DESCENT = 'S'
                
                --Filter for Age. (I assume the slider will be used to shift the numbers used here)
                ${ageQuery}
    --            AND l.VICT_AGE >= 18
                --AND l.VICT_AGE <= 99
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = cc.MOST_COMMON_CRIME AND l.DATE_RPTD >= '01-JAN-2011' AND l.DATE_RPTD <= '31-DEC-2011' AND l.DATE_RPTD IS NOT NULL
        AND l.VICT_SEX = 'M'
        ORDER BY RATIO_2011 DESC
        FETCH FIRST 5 ROWS ONLY
        ) r11 ON l.CRM_CD_DESC = r11.MOST_COMMON_CRIMES_2011
    FULL JOIN
        (SELECT DISTINCT c.CRIME AS MOST_COMMON_CRIMES_2012, (c.OCCURRENCE / s.SUMMATION) AS RATIO_2012
        FROM WGREGORY.LA_CRIMES l, WGREGORY.CRIME_COUNT cc,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l
                WHERE l.DATE_RPTD >= '01-JAN-2012' AND l.DATE_RPTD <= '31-DEC-2012' AND l.DATE_RPTD IS NOT NULL
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l
            WHERE l.DATE_RPTD >= '01-JAN-2012' AND l.DATE_RPTD <= '31-DEC-2012' AND l.DATE_RPTD IS NOT NULL
            --Filter for Sex here
            ${sexQuery}
    --        AND l.VICT_SEX = 'M'
            --AND l.VICT_SEX = 'F'
            --AND l.VICT_SEX = 'X'
            
            --Filter for Descent here (Place ( after AND, then OR l.VICT_DESCENT = '' after AND ( l.VICT_DESCENT = '' to account for combinations Then end line with ).
            ${descentQuery}
                --AND l.VICT_DESCENT = 'X'
    --            AND l.VICT_DESCENT = 'B'
                --AND l.VICT_DESCENT = 'F'
                --AND l.VICT_DESCENT = 'V'
                --AND l.VICT_DESCENT = 'O'
                --AND l.VICT_DESCENT = 'K'
                --AND l.VICT_DESCENT = 'H'
    --            AND l.VICT_DESCENT = 'W'
                --AND l.VICT_DESCENT = 'C'
                --AND l.VICT_DESCENT = 'U'
                --AND l.VICT_DESCENT = 'I'
                --AND l.VICT_DESCENT = 'A'
                --AND l.VICT_DESCENT = 'P'
                --AND l.VICT_DESCENT = 'J'
                --AND l.VICT_DESCENT = 'Z'
                --AND l.VICT_DESCENT = 'D'
                --AND l.VICT_DESCENT = 'G'
                --AND l.VICT_DESCENT = 'L'
                --AND l.VICT_DESCENT = 'S'
                
                --Filter for Age. (I assume the slider will be used to shift the numbers used here)
                ${ageQuery}
    --            AND l.VICT_AGE >= 18
                --AND l.VICT_AGE <= 99
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = cc.MOST_COMMON_CRIME AND l.DATE_RPTD >= '01-JAN-2012' AND l.DATE_RPTD <= '31-DEC-2012' AND l.DATE_RPTD IS NOT NULL
        ORDER BY RATIO_2012 DESC
        FETCH FIRST 5 ROWS ONLY
        ) r12 ON l.CRM_CD_DESC = r12.MOST_COMMON_CRIMES_2012
    FULL JOIN
        (SELECT DISTINCT c.CRIME AS MOST_COMMON_CRIMES_2013, (c.OCCURRENCE / s.SUMMATION) AS RATIO_2013
        FROM WGREGORY.LA_CRIMES l, WGREGORY.CRIME_COUNT cc,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l
                WHERE l.DATE_RPTD >= '01-JAN-2013' AND l.DATE_RPTD <= '31-DEC-2013' AND l.DATE_RPTD IS NOT NULL
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l
            WHERE l.DATE_RPTD >= '01-JAN-2013' AND l.DATE_RPTD <= '31-DEC-2013' AND l.DATE_RPTD IS NOT NULL
            --Filter for Sex here
            ${sexQuery}
    --        AND l.VICT_SEX = 'M'
            --AND l.VICT_SEX = 'F'
            --AND l.VICT_SEX = 'X'
            
            --Filter for Descent here (Place ( after AND, then OR l.VICT_DESCENT = '' after AND ( l.VICT_DESCENT = '' to account for combinations Then end line with ).
            ${descentQuery}
                --AND l.VICT_DESCENT = 'X'
    --            AND l.VICT_DESCENT = 'B'
                --AND l.VICT_DESCENT = 'F'
                --AND l.VICT_DESCENT = 'V'
                --AND l.VICT_DESCENT = 'O'
                --AND l.VICT_DESCENT = 'K'
                --AND l.VICT_DESCENT = 'H'
    --            AND l.VICT_DESCENT = 'W'
                --AND l.VICT_DESCENT = 'C'
                --AND l.VICT_DESCENT = 'U'
                --AND l.VICT_DESCENT = 'I'
                --AND l.VICT_DESCENT = 'A'
                --AND l.VICT_DESCENT = 'P'
                --AND l.VICT_DESCENT = 'J'
                --AND l.VICT_DESCENT = 'Z'
                --AND l.VICT_DESCENT = 'D'
                --AND l.VICT_DESCENT = 'G'
                --AND l.VICT_DESCENT = 'L'
                --AND l.VICT_DESCENT = 'S'
                
                --Filter for Age. (I assume the slider will be used to shift the numbers used here)
                ${ageQuery}
    --            AND l.VICT_AGE >= 18
                --AND l.VICT_AGE <= 99
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = cc.MOST_COMMON_CRIME AND l.DATE_RPTD >= '01-JAN-2013' AND l.DATE_RPTD <= '31-DEC-2013' AND l.DATE_RPTD IS NOT NULL
        ORDER BY RATIO_2013 DESC
        FETCH FIRST 5 ROWS ONLY
        ) r13 ON l.CRM_CD_DESC = r13.MOST_COMMON_CRIMES_2013
    FULL JOIN
        (SELECT DISTINCT c.CRIME AS MOST_COMMON_CRIMES_2014, (c.OCCURRENCE / s.SUMMATION) AS RATIO_2014
        FROM WGREGORY.LA_CRIMES l, WGREGORY.CRIME_COUNT cc,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l
                WHERE l.DATE_RPTD >= '01-JAN-2014' AND l.DATE_RPTD <= '31-DEC-2014' AND l.DATE_RPTD IS NOT NULL
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l
            WHERE l.DATE_RPTD >= '01-JAN-2014' AND l.DATE_RPTD <= '31-DEC-2014' AND l.DATE_RPTD IS NOT NULL
            --Filter for Sex here
            ${sexQuery}
    --        AND l.VICT_SEX = 'M'
            --AND l.VICT_SEX = 'F'
            --AND l.VICT_SEX = 'X'
            
            --Filter for Descent here (Place ( after AND, then OR l.VICT_DESCENT = '' after AND ( l.VICT_DESCENT = '' to account for combinations Then end line with ).
            ${descentQuery}
                --AND l.VICT_DESCENT = 'X'
    --            AND l.VICT_DESCENT = 'B'
                --AND l.VICT_DESCENT = 'F'
                --AND l.VICT_DESCENT = 'V'
                --AND l.VICT_DESCENT = 'O'
                --AND l.VICT_DESCENT = 'K'
                --AND l.VICT_DESCENT = 'H'
    --            AND l.VICT_DESCENT = 'W'
                --AND l.VICT_DESCENT = 'C'
                --AND l.VICT_DESCENT = 'U'
                --AND l.VICT_DESCENT = 'I'
                --AND l.VICT_DESCENT = 'A'
                --AND l.VICT_DESCENT = 'P'
                --AND l.VICT_DESCENT = 'J'
                --AND l.VICT_DESCENT = 'Z'
                --AND l.VICT_DESCENT = 'D'
                --AND l.VICT_DESCENT = 'G'
                --AND l.VICT_DESCENT = 'L'
                --AND l.VICT_DESCENT = 'S'
                
                --Filter for Age. (I assume the slider will be used to shift the numbers used here)
                ${ageQuery}
    --            AND l.VICT_AGE >= 18
                --AND l.VICT_AGE <= 99
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = cc.MOST_COMMON_CRIME AND l.DATE_RPTD >= '01-JAN-2014' AND l.DATE_RPTD <= '31-DEC-2014' AND l.DATE_RPTD IS NOT NULL
        ORDER BY RATIO_2014 DESC
        FETCH FIRST 5 ROWS ONLY
        ) r14 ON l.CRM_CD_DESC = r14.MOST_COMMON_CRIMES_2014
    FULL JOIN
        (SELECT DISTINCT c.CRIME AS MOST_COMMON_CRIMES_2015, (c.OCCURRENCE / s.SUMMATION) AS RATIO_2015
        FROM WGREGORY.LA_CRIMES l, WGREGORY.CRIME_COUNT cc,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l
                WHERE l.DATE_RPTD >= '01-JAN-2015' AND l.DATE_RPTD <= '31-DEC-2015' AND l.DATE_RPTD IS NOT NULL
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l
            WHERE l.DATE_RPTD >= '01-JAN-2015' AND l.DATE_RPTD <= '31-DEC-2015' AND l.DATE_RPTD IS NOT NULL
            --Filter for Sex here
            ${sexQuery}
    --        AND l.VICT_SEX = 'M'
            --AND l.VICT_SEX = 'F'
            --AND l.VICT_SEX = 'X'
            
            --Filter for Descent here (Place ( after AND, then OR l.VICT_DESCENT = '' after AND ( l.VICT_DESCENT = '' to account for combinations Then end line with ).
            ${descentQuery}
                --AND l.VICT_DESCENT = 'X'
    --            AND l.VICT_DESCENT = 'B'
                --AND l.VICT_DESCENT = 'F'
                --AND l.VICT_DESCENT = 'V'
                --AND l.VICT_DESCENT = 'O'
                --AND l.VICT_DESCENT = 'K'
                --AND l.VICT_DESCENT = 'H'
    --            AND l.VICT_DESCENT = 'W'
                --AND l.VICT_DESCENT = 'C'
                --AND l.VICT_DESCENT = 'U'
                --AND l.VICT_DESCENT = 'I'
                --AND l.VICT_DESCENT = 'A'
                --AND l.VICT_DESCENT = 'P'
                --AND l.VICT_DESCENT = 'J'
                --AND l.VICT_DESCENT = 'Z'
                --AND l.VICT_DESCENT = 'D'
                --AND l.VICT_DESCENT = 'G'
                --AND l.VICT_DESCENT = 'L'
                --AND l.VICT_DESCENT = 'S'
                
                --Filter for Age. (I assume the slider will be used to shift the numbers used here)
                ${ageQuery}
    --            AND l.VICT_AGE >= 18
                --AND l.VICT_AGE <= 99
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = cc.MOST_COMMON_CRIME AND l.DATE_RPTD >= '01-JAN-2015' AND l.DATE_RPTD <= '31-DEC-2015' AND l.DATE_RPTD IS NOT NULL
        ORDER BY RATIO_2015 DESC
        FETCH FIRST 5 ROWS ONLY
        ) r15 ON l.CRM_CD_DESC = r15.MOST_COMMON_CRIMES_2015
    FULL JOIN
        (SELECT DISTINCT c.CRIME AS MOST_COMMON_CRIMES_2016, (c.OCCURRENCE / s.SUMMATION) AS RATIO_2016
        FROM WGREGORY.LA_CRIMES l, WGREGORY.CRIME_COUNT cc,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l
                WHERE l.DATE_RPTD >= '01-JAN-2016' AND l.DATE_RPTD <= '31-DEC-2016' AND l.DATE_RPTD IS NOT NULL
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l
            WHERE l.DATE_RPTD >= '01-JAN-2016' AND l.DATE_RPTD <= '31-DEC-2016' AND l.DATE_RPTD IS NOT NULL
            --Filter for Sex here
            ${sexQuery}
    --        AND l.VICT_SEX = 'M'
            --AND l.VICT_SEX = 'F'
            --AND l.VICT_SEX = 'X'
            
            --Filter for Descent here (Place ( after AND, then OR l.VICT_DESCENT = '' after AND ( l.VICT_DESCENT = '' to account for combinations Then end line with ).
            ${descentQuery}
                --AND l.VICT_DESCENT = 'X'
    --            AND l.VICT_DESCENT = 'B'
                --AND l.VICT_DESCENT = 'F'
                --AND l.VICT_DESCENT = 'V'
                --AND l.VICT_DESCENT = 'O'
                --AND l.VICT_DESCENT = 'K'
                --AND l.VICT_DESCENT = 'H'
    --            AND l.VICT_DESCENT = 'W'
                --AND l.VICT_DESCENT = 'C'
                --AND l.VICT_DESCENT = 'U'
                --AND l.VICT_DESCENT = 'I'
                --AND l.VICT_DESCENT = 'A'
                --AND l.VICT_DESCENT = 'P'
                --AND l.VICT_DESCENT = 'J'
                --AND l.VICT_DESCENT = 'Z'
                --AND l.VICT_DESCENT = 'D'
                --AND l.VICT_DESCENT = 'G'
                --AND l.VICT_DESCENT = 'L'
                --AND l.VICT_DESCENT = 'S'
                
                --Filter for Age. (I assume the slider will be used to shift the numbers used here)
                ${ageQuery}
    --            AND l.VICT_AGE >= 18
                --AND l.VICT_AGE <= 99
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = cc.MOST_COMMON_CRIME AND l.DATE_RPTD >= '01-JAN-2016' AND l.DATE_RPTD <= '31-DEC-2016' AND l.DATE_RPTD IS NOT NULL
        ORDER BY RATIO_2016 DESC
        FETCH FIRST 5 ROWS ONLY
        ) r16 ON l.CRM_CD_DESC = r16.MOST_COMMON_CRIMES_2016
    FULL JOIN
        (SELECT DISTINCT c.CRIME AS MOST_COMMON_CRIMES_2017, (c.OCCURRENCE / s.SUMMATION) AS RATIO_2017
        FROM WGREGORY.LA_CRIMES l, WGREGORY.CRIME_COUNT cc,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l
                WHERE l.DATE_RPTD >= '01-JAN-2017' AND l.DATE_RPTD <= '31-DEC-2017' AND l.DATE_RPTD IS NOT NULL
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l
            WHERE l.DATE_RPTD >= '01-JAN-2017' AND l.DATE_RPTD <= '31-DEC-2017' AND l.DATE_RPTD IS NOT NULL
            --Filter for Sex here
            ${sexQuery}
    --        AND l.VICT_SEX = 'M'
            --AND l.VICT_SEX = 'F'
            --AND l.VICT_SEX = 'X'
            
            --Filter for Descent here (Place ( after AND, then OR l.VICT_DESCENT = '' after AND ( l.VICT_DESCENT = '' to account for combinations Then end line with ).
            ${descentQuery}
                --AND l.VICT_DESCENT = 'X'
    --            AND l.VICT_DESCENT = 'B'
                --AND l.VICT_DESCENT = 'F'
                --AND l.VICT_DESCENT = 'V'
                --AND l.VICT_DESCENT = 'O'
                --AND l.VICT_DESCENT = 'K'
                --AND l.VICT_DESCENT = 'H'
    --            AND l.VICT_DESCENT = 'W'
                --AND l.VICT_DESCENT = 'C'
                --AND l.VICT_DESCENT = 'U'
                --AND l.VICT_DESCENT = 'I'
                --AND l.VICT_DESCENT = 'A'
                --AND l.VICT_DESCENT = 'P'
                --AND l.VICT_DESCENT = 'J'
                --AND l.VICT_DESCENT = 'Z'
                --AND l.VICT_DESCENT = 'D'
                --AND l.VICT_DESCENT = 'G'
                --AND l.VICT_DESCENT = 'L'
                --AND l.VICT_DESCENT = 'S'
                
                --Filter for Age. (I assume the slider will be used to shift the numbers used here)
                ${ageQuery}
    --            AND l.VICT_AGE >= 18
                --AND l.VICT_AGE <= 99
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = cc.MOST_COMMON_CRIME AND l.DATE_RPTD >= '01-JAN-2017' AND l.DATE_RPTD <= '31-DEC-2017' AND l.DATE_RPTD IS NOT NULL
        ORDER BY RATIO_2017 DESC
        FETCH FIRST 5 ROWS ONLY
        ) r17 ON l.CRM_CD_DESC = r17.MOST_COMMON_CRIMES_2017
    FULL JOIN
        (SELECT DISTINCT c.CRIME AS MOST_COMMON_CRIMES_2018, (c.OCCURRENCE / s.SUMMATION) AS RATIO_2018
        FROM WGREGORY.LA_CRIMES l, WGREGORY.CRIME_COUNT cc,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l
                WHERE l.DATE_RPTD >= '01-JAN-2018' AND l.DATE_RPTD <= '31-DEC-2018' AND l.DATE_RPTD IS NOT NULL
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l
            WHERE l.DATE_RPTD >= '01-JAN-2018' AND l.DATE_RPTD <= '31-DEC-2018' AND l.DATE_RPTD IS NOT NULL
            --Filter for Sex here
            ${sexQuery}
    --        AND l.VICT_SEX = 'M'
            --AND l.VICT_SEX = 'F'
            --AND l.VICT_SEX = 'X'
            
            --Filter for Descent here (Place ( after AND, then OR l.VICT_DESCENT = '' after AND ( l.VICT_DESCENT = '' to account for combinations Then end line with ).
            ${descentQuery}
                --AND l.VICT_DESCENT = 'X'
    --            AND l.VICT_DESCENT = 'B'
                --AND l.VICT_DESCENT = 'F'
                --AND l.VICT_DESCENT = 'V'
                --AND l.VICT_DESCENT = 'O'
                --AND l.VICT_DESCENT = 'K'
                --AND l.VICT_DESCENT = 'H'
    --            AND l.VICT_DESCENT = 'W'
                --AND l.VICT_DESCENT = 'C'
                --AND l.VICT_DESCENT = 'U'
                --AND l.VICT_DESCENT = 'I'
                --AND l.VICT_DESCENT = 'A'
                --AND l.VICT_DESCENT = 'P'
                --AND l.VICT_DESCENT = 'J'
                --AND l.VICT_DESCENT = 'Z'
                --AND l.VICT_DESCENT = 'D'
                --AND l.VICT_DESCENT = 'G'
                --AND l.VICT_DESCENT = 'L'
                --AND l.VICT_DESCENT = 'S'
                
                --Filter for Age. (I assume the slider will be used to shift the numbers used here)
                ${ageQuery}
    --            AND l.VICT_AGE >= 18
                --AND l.VICT_AGE <= 99
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = cc.MOST_COMMON_CRIME AND l.DATE_RPTD >= '01-JAN-2018' AND l.DATE_RPTD <= '31-DEC-2018' AND l.DATE_RPTD IS NOT NULL
        ORDER BY RATIO_2018 DESC
        FETCH FIRST 5 ROWS ONLY
        ) r18 ON l.CRM_CD_DESC = r18.MOST_COMMON_CRIMES_2018
    FULL JOIN
        (SELECT DISTINCT c.CRIME AS MOST_COMMON_CRIMES_2019, (c.OCCURRENCE / s.SUMMATION) AS RATIO_2019
        FROM WGREGORY.LA_CRIMES l, WGREGORY.CRIME_COUNT cc,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l
                WHERE l.DATE_RPTD >= '01-JAN-2019' AND l.DATE_RPTD <= '31-DEC-2019' AND l.DATE_RPTD IS NOT NULL
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l
            WHERE l.DATE_RPTD >= '01-JAN-2019' AND l.DATE_RPTD <= '31-DEC-2019' AND l.DATE_RPTD IS NOT NULL
            --Filter for Sex here
            ${sexQuery}
    --        AND l.VICT_SEX = 'M'
            --AND l.VICT_SEX = 'F'
            --AND l.VICT_SEX = 'X'
            
            --Filter for Descent here (Place ( after AND, then OR l.VICT_DESCENT = '' after AND ( l.VICT_DESCENT = '' to account for combinations Then end line with ).
            ${descentQuery}
                --AND l.VICT_DESCENT = 'X'
    --            AND l.VICT_DESCENT = 'B'
                --AND l.VICT_DESCENT = 'F'
                --AND l.VICT_DESCENT = 'V'
                --AND l.VICT_DESCENT = 'O'
                --AND l.VICT_DESCENT = 'K'
                --AND l.VICT_DESCENT = 'H'
    --            AND l.VICT_DESCENT = 'W'
                --AND l.VICT_DESCENT = 'C'
                --AND l.VICT_DESCENT = 'U'
                --AND l.VICT_DESCENT = 'I'
                --AND l.VICT_DESCENT = 'A'
                --AND l.VICT_DESCENT = 'P'
                --AND l.VICT_DESCENT = 'J'
                --AND l.VICT_DESCENT = 'Z'
                --AND l.VICT_DESCENT = 'D'
                --AND l.VICT_DESCENT = 'G'
                --AND l.VICT_DESCENT = 'L'
                --AND l.VICT_DESCENT = 'S'
                
                --Filter for Age. (I assume the slider will be used to shift the numbers used here)
                ${ageQuery}
    --            AND l.VICT_AGE >= 18
                --AND l.VICT_AGE <= 99
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = cc.MOST_COMMON_CRIME AND l.DATE_RPTD >= '01-JAN-2019' AND l.DATE_RPTD <= '31-DEC-2019' AND l.DATE_RPTD IS NOT NULL
        ORDER BY RATIO_2019 DESC
        FETCH FIRST 5 ROWS ONLY
        ) r19 ON l.CRM_CD_DESC = r19.MOST_COMMON_CRIMES_2019
    FULL JOIN
        (SELECT DISTINCT c.CRIME AS MOST_COMMON_CRIMES_2020, (c.OCCURRENCE / s.SUMMATION) AS RATIO_2020
        FROM WGREGORY.LA_CRIMES l, WGREGORY.CRIME_COUNT cc,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l
                WHERE l.DATE_RPTD >= '01-JAN-2020' AND l.DATE_RPTD <= '31-DEC-2020' AND l.DATE_RPTD IS NOT NULL
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l
            WHERE l.DATE_RPTD >= '01-JAN-2020' AND l.DATE_RPTD <= '31-DEC-2020' AND l.DATE_RPTD IS NOT NULL
            --Filter for Sex here
            ${sexQuery}
    --        AND l.VICT_SEX = 'M'
            --AND l.VICT_SEX = 'F'
            --AND l.VICT_SEX = 'X'
            
            --Filter for Descent here (Place ( after AND, then OR l.VICT_DESCENT = '' after AND ( l.VICT_DESCENT = '' to account for combinations Then end line with ).
            ${descentQuery}
                --AND l.VICT_DESCENT = 'X'
    --            AND l.VICT_DESCENT = 'B'
                --AND l.VICT_DESCENT = 'F'
                --AND l.VICT_DESCENT = 'V'
                --AND l.VICT_DESCENT = 'O'
                --AND l.VICT_DESCENT = 'K'
                --AND l.VICT_DESCENT = 'H'
    --            AND l.VICT_DESCENT = 'W'
                --AND l.VICT_DESCENT = 'C'
                --AND l.VICT_DESCENT = 'U'
                --AND l.VICT_DESCENT = 'I'
                --AND l.VICT_DESCENT = 'A'
                --AND l.VICT_DESCENT = 'P'
                --AND l.VICT_DESCENT = 'J'
                --AND l.VICT_DESCENT = 'Z'
                --AND l.VICT_DESCENT = 'D'
                --AND l.VICT_DESCENT = 'G'
                --AND l.VICT_DESCENT = 'L'
                --AND l.VICT_DESCENT = 'S'
                
                --Filter for Age. (I assume the slider will be used to shift the numbers used here)
                ${ageQuery}
    --            AND l.VICT_AGE >= 18
                --AND l.VICT_AGE <= 99
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = cc.MOST_COMMON_CRIME AND l.DATE_RPTD >= '01-JAN-2020' AND l.DATE_RPTD <= '31-DEC-2020' AND l.DATE_RPTD IS NOT NULL
        ORDER BY RATIO_2020 DESC
        FETCH FIRST 5 ROWS ONLY
        ) r20 ON l.CRM_CD_DESC = r20.MOST_COMMON_CRIMES_2020
    FULL JOIN
        (SELECT DISTINCT c.CRIME AS MOST_COMMON_CRIMES_2021, (c.OCCURRENCE / s.SUMMATION) AS RATIO_2021
        FROM WGREGORY.LA_CRIMES l, WGREGORY.CRIME_COUNT cc,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l
                WHERE l.DATE_RPTD >= '01-JAN-2021' AND l.DATE_RPTD <= '31-DEC-2021' AND l.DATE_RPTD IS NOT NULL
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l
            WHERE l.DATE_RPTD >= '01-JAN-2021' AND l.DATE_RPTD <= '31-DEC-2021' AND l.DATE_RPTD IS NOT NULL
            --Filter for Sex here
            ${sexQuery}
    --        AND l.VICT_SEX = 'M'
            --AND l.VICT_SEX = 'F'
            --AND l.VICT_SEX = 'X'
            
            --Filter for Descent here (Place ( after AND, then OR l.VICT_DESCENT = '' after AND ( l.VICT_DESCENT = '' to account for combinations Then end line with ).
            ${descentQuery}
                --AND l.VICT_DESCENT = 'X'
    --            AND l.VICT_DESCENT = 'B'
                --AND l.VICT_DESCENT = 'F'
                --AND l.VICT_DESCENT = 'V'
                --AND l.VICT_DESCENT = 'O'
                --AND l.VICT_DESCENT = 'K'
                --AND l.VICT_DESCENT = 'H'
    --            AND l.VICT_DESCENT = 'W'
                --AND l.VICT_DESCENT = 'C'
                --AND l.VICT_DESCENT = 'U'
                --AND l.VICT_DESCENT = 'I'
                --AND l.VICT_DESCENT = 'A'
                --AND l.VICT_DESCENT = 'P'
                --AND l.VICT_DESCENT = 'J'
                --AND l.VICT_DESCENT = 'Z'
                --AND l.VICT_DESCENT = 'D'
                --AND l.VICT_DESCENT = 'G'
                --AND l.VICT_DESCENT = 'L'
                --AND l.VICT_DESCENT = 'S'
                
                --Filter for Age. (I assume the slider will be used to shift the numbers used here)
                ${ageQuery}
    --            AND l.VICT_AGE >= 18
                --AND l.VICT_AGE <= 99
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = cc.MOST_COMMON_CRIME AND l.DATE_RPTD >= '01-JAN-2021' AND l.DATE_RPTD <= '31-DEC-2021' AND l.DATE_RPTD IS NOT NULL
        ORDER BY RATIO_2021 DESC
        FETCH FIRST 5 ROWS ONLY
        ) r21 ON l.CRM_CD_DESC = r21.MOST_COMMON_CRIMES_2021
    FULL JOIN
        (SELECT DISTINCT c.CRIME AS MOST_COMMON_CRIMES_2022, (c.OCCURRENCE / s.SUMMATION) AS RATIO_2022
        FROM WGREGORY.LA_CRIMES l, WGREGORY.CRIME_COUNT cc,
            (SELECT DISTINCT SUM(c.OCCURRENCE) AS SUMMATION
            FROM 
                (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
                FROM WGREGORY.LA_CRIMES l
                WHERE l.DATE_RPTD >= '01-JAN-2022' AND l.DATE_RPTD <= '31-DEC-2022' AND l.DATE_RPTD IS NOT NULL
                GROUP BY l.CRM_CD_DESC
                ) c
            ) s,
            (SELECT DISTINCT l.CRM_CD_DESC AS CRIME, COUNT(l.CRM_CD_DESC) AS OCCURRENCE
            FROM WGREGORY.LA_CRIMES l
            WHERE l.DATE_RPTD >= '01-JAN-2022' AND l.DATE_RPTD <= '31-DEC-2022' AND l.DATE_RPTD IS NOT NULL
            --Filter for Sex here
            ${sexQuery}
    --        AND l.VICT_SEX = 'M'
            --AND l.VICT_SEX = 'F'
            --AND l.VICT_SEX = 'X'
            
            --Filter for Descent here (Place ( after AND, then OR l.VICT_DESCENT = '' after AND ( l.VICT_DESCENT = '' to account for combinations Then end line with ).
            ${descentQuery}
                --AND l.VICT_DESCENT = 'X'
    --            AND l.VICT_DESCENT = 'B'
                --AND l.VICT_DESCENT = 'F'
                --AND l.VICT_DESCENT = 'V'
                --AND l.VICT_DESCENT = 'O'
                --AND l.VICT_DESCENT = 'K'
                --AND l.VICT_DESCENT = 'H'
    --            AND l.VICT_DESCENT = 'W'
                --AND l.VICT_DESCENT = 'C'
                --AND l.VICT_DESCENT = 'U'
                --AND l.VICT_DESCENT = 'I'
                --AND l.VICT_DESCENT = 'A'
                --AND l.VICT_DESCENT = 'P'
                --AND l.VICT_DESCENT = 'J'
                --AND l.VICT_DESCENT = 'Z'
                --AND l.VICT_DESCENT = 'D'
                --AND l.VICT_DESCENT = 'G'
                --AND l.VICT_DESCENT = 'L'
                --AND l.VICT_DESCENT = 'S'
                
                --Filter for Age. (I assume the slider will be used to shift the numbers used here)
                ${ageQuery}
    --            AND l.VICT_AGE >= 18
                --AND l.VICT_AGE <= 99
            GROUP BY l.CRM_CD_DESC
            ) c
        WHERE c.CRIME = cc.MOST_COMMON_CRIME AND l.DATE_RPTD >= '01-JAN-2022' AND l.DATE_RPTD <= '31-DEC-2022' AND l.DATE_RPTD IS NOT NULL
        ORDER BY RATIO_2022 DESC
        FETCH FIRST 5 ROWS ONLY
        ) r22 ON l.CRM_CD_DESC = r22.MOST_COMMON_CRIMES_2022
    WHERE r10.MOST_COMMON_CRIMES_2010 IS NOT NULL AND r11.MOST_COMMON_CRIMES_2011 IS NOT NULL AND r12.MOST_COMMON_CRIMES_2012 IS NOT NULL AND r13.MOST_COMMON_CRIMES_2013 IS NOT NULL AND r14.MOST_COMMON_CRIMES_2014 IS NOT NULL AND r15.MOST_COMMON_CRIMES_2015 IS NOT NULL AND r16.MOST_COMMON_CRIMES_2016 IS NOT NULL AND r17.MOST_COMMON_CRIMES_2017 IS NOT NULL AND r18.MOST_COMMON_CRIMES_2018 IS NOT NULL AND r19.MOST_COMMON_CRIMES_2019 IS NOT NULL  `
    
        fs.writeFile('test.txt', query_3, err => {
            if (err) {
            console.error(err);
            }
            // file written successfully
        });

    return query_3
}

app.get('/query_2_data', function (req, res) {
    console.log("REQ, ", req.query);
    if (req.query.district === '') {
        res.end(JSON.stringify({
            "Data_Count": 0,
            "Data": []
        }));
    }

    else {
        parseDataFromQuery(generateQuery2(req.query.district, req.query.vehicleCrimeTypes)).then((output) => {
            res.end(JSON.stringify(output))        
        })
    }
    
})

app.get('/query_3_data', function (req, res) {
    console.log("REQ, ", req.query);
    if (req.query.descent === 'undefined' || req.query.sex === '' || req.query.ageStart === 'undefined' || req.query.ageEnd === 'undefined')  {
        res.end(JSON.stringify({
            "Data_Count": 0,
            "Data": []
        }));
    }

    else {
        parseDataFromQuery(generateQuery3(req.query.sex, req.query.descent, req.query.ageStart, req.query.ageEnd)).then((output) => {
            res.end(JSON.stringify(output))        
        })
    }
    
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})