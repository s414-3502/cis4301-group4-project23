// const oracledb = require("oracledb");
export const QueryHandler = async () => {
    return JSON.parse(
        `{"metaData":[{"name":"VEHICLE_RELATED_CRIMES_2010"},{"name":"PERCENTAGE_2010"},{"name":"YEAR_2010"},{"name":"VEHICLE_RELATED_CRIMES_2011"},{"name":"PERCENTAGE_2011"},{"name":"YEAR_2011"},{"name":"VEHICLE_RELATED_CRIMES_2012"},{"name":"PERCENTAGE_2012"},{"name":"YEAR_2012"},{"name":"VEHICLE_RELATED_CRIMES_2013"},{"name":"PERCENTAGE_2013"},{"name":"YEAR_2013"},{"name":"VEHICLE_RELATED_CRIMES_2014"},{"name":"PERCENTAGE_2014"},{"name":"YEAR_2014"},{"name":"VEHICLE_RELATED_CRIMES_2015"},{"name":"PERCENTAGE_2015"},{"name":"YEAR_2015"},{"name":"VEHICLE_RELATED_CRIMES_2016"},{"name":"PERCENTAGE_2016"},{"name":"YEAR_2016"},{"name":"VEHICLE_RELATED_CRIMES_2017"},{"name":"PERCENTAGE_2017"},{"name":"YEAR_2017"},{"name":"VEHICLE_RELATED_CRIMES_2018"},{"name":"PERCENTAGE_2018"},{"name":"YEAR_2018"},{"name":"VEHICLE_RELATED_CRIMES_2019"},{"name":"PERCENTAGE_2019"},{"name":"YEAR_2019"},{"name":"VEHICLE_RELATED_CRIMES_2020"},{"name":"PERCENTAGE_2020"},{"name":"YEAR_2020"},{"name":"VEHICLE_RELATED_CRIMES_2021"},{"name":"PERCENTAGE_2021"},{"name":"YEAR_2021"},{"name":"VEHICLE_RELATED_CRIMES_2022"},{"name":"PERCENTAGE_2022"},{"name":"YEAR_2022"}],"rows":[["BURGLARY FROM VEHICLE",8.32095096582467,2010,"BURGLARY FROM VEHICLE",7.200200702458609,2011,"BURGLARY FROM VEHICLE",6.414201183431949,2012,"BURGLARY FROM VEHICLE",6.980273141122909,2013,"BURGLARY FROM VEHICLE",6.543624161073829,2014,"BURGLARY FROM VEHICLE",5.76235541535226,2015,"BURGLARY FROM VEHICLE",7.44616623062991,2016,"BURGLARY FROM VEHICLE",8.19171281267901,2017,"BURGLARY FROM VEHICLE",9.12525977706405,2018,"BURGLARY FROM VEHICLE",8.805998846375699,2019,"BURGLARY FROM VEHICLE",3.93700787401575,2020,null,0,2021,null,0,2022],["RECKLESS DRIVING",0.024764735017335303,2010,"RECKLESS DRIVING",0.0250878073256397,2011,null,0,2012,null,0,2013,"RECKLESS DRIVING",0.0479386385426654,2014,null,0,2015,null,0,2016,null,0,2017,null,0,2018,null,0,2019,null,0,2020,null,0,2021,null,0,2022]]}`
    )
}

// export const QueryHandler = async (query) => {
//     console.log("fetching connection")
//     try {
//         let connection = await oracledb.getConnection(
//             {
//                 user: "ananya.agrawal",
//                 password: "",
//                 connectionString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = oracle.cise.ufl.edu)(PORT = 1521))(CONNECT_DATA=(SID=ORCL)))"
//             }
//         )
//         const data = await connection.execute(query)

//         return data
//     }

//     catch (err) {
//         console.log(err)
//     }
// }
