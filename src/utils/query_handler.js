const oracledb = require("oracledb");
module.exports = async function QueryHandler(query) {
    console.log("fetching connection")
    try {
        let connection = await oracledb.getConnection(
            {
                user: "",
                password: "",
                connectionString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = oracle.cise.ufl.edu)(PORT = 1521))(CONNECT_DATA=(SID=ORCL)))"
            }
        )
        const data = await connection.execute(query)
        // const total_rows = await connection.execute('SELECT COUNT(*) FROM WGREGORY.LA_CRIMES ')
        // console.log(total_rows.rows[0][0])
        // for (let i = 0; i < 1; i++){
        //   const temp = await connection.execute(`SELECT * FROM WGREGORY.LA_CRIMES OFFSET ${i*10000} ROWS FETCH FIRST 10000 ROWS ONLY    `)
        //   data.concat(temp.rows)
        //   console.log(temp.rows)
        //   console.log(`fetch ${i*10000} rows`)
        // }
        // const data = await connection.execute('SELECT * FROM PROJECT OFFSET 10 ROWS FETCH FIRST 10000 ROWS ONLY    ')
        // console.log(data[0])
        return data
    }

    catch (err) {
        console.log(err)
    }
}
