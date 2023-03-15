const oracledb = require("oracledb");
async function TestConnection() {
    console.log("fetching connection")
  try {
    let connection = await oracledb.getConnection(
      {
        user: "enter_username",
        password: "enter_password",
        connectionString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = oracle.cise.ufl.edu)(PORT = 1521))(CONNECT_DATA=(SID=ORCL)))"
      }
    )
    const data = await connection.execute('input query without semicolon at end ')
    console.log(data.rows)
  }

  catch(err){
    console.log(err)
  }
  console.log("Hello!")    
}

TestConnection();