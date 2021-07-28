import { createAllTables } from "./src/manage/create-all-tables.ts";
import { dbFileName } from "./src/config/db_sqlite_client.ts";
//import {  } from "./oak-auth-sqlite-app/config/";
import appsArray from "./src/config/installed-apps.ts";
Deno.chdir("./src")

createAllTables(appsArray,dbFileName)
 

// deno run --allow-all cli.ts