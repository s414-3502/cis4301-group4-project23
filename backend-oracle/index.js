
const oracledb = require("oracledb");

require('dotenv').config({ path: '.env' })

const username = process.env.REACT_APP_USERNAME;
const password = process.env.REACT_APP_PW;

async function TestConnection() {
    console.log("fetching connection")
  try {
    let connection = await oracledb.getConnection(
      {
        user: username,
        password: password,
        connectionString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = oracle.cise.ufl.edu)(PORT = 1521))(CONNECT_DATA=(SID=ORCL)))"
      }
    )
    const data = await connection.execute('input query without semicolon')
    console.log(data.rows)
  }

  catch(err){
    console.log(err)
  }
  console.log("Hello!")    
}

TestConnection();