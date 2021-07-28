import { createTables } from "./create-tables.ts";
import{ getDbClient } from "../config/db_sqlite_client.ts";
 
export function createAllTables(appsArray: string[],dbFileName:string):boolean{
  console.log({appsArray})
  const dbClient = getDbClient(dbFileName)
  try {
    appsArray.forEach(
      (appName) => { 
        const path = `./${appName}/config/create-tables.sql`; 
        
        createTables(dbClient, path);
        console.log(`tables for ${appName} are created`)
       
      },
    );
    console.log("tables was created") 
    return true
    
  } catch (error) {
    console.log({error})
    return false
  }

}
