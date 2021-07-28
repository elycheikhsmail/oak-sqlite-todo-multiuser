//import client from "../config/db_sqlite_client.ts";
import todoSql from "./todo-sqlite-sql.ts";
import { DB as DbClient } from "./deps.ts";

class TodoService {
  // tn = tablenale
  tn = "todo_task";

  async getAll(dbClient:DbClient,ownerId:number) {
    const sql = todoSql.getAll(); 
    const rows = await [...dbClient.query(sql,[ownerId]).asObjects()];
    return rows;
  }

getById(dbClient:DbClient,ownerId:number,id:number):undefined[][] {
    const sql = todoSql.getById(); 
    console.log(sql)
    try {
      const rows = [...dbClient.query(sql,[ownerId,id])]; 
    console.log(rows)
    return rows
    } catch (error) {
      console.log(error)
      return []
    }
    
  }

  async save(dbClient:DbClient, ownerId:number ,text: string) {
    const sql = todoSql.save();
    try { 
      await dbClient.query(sql, [ownerId,text]); 
      return dbClient.lastInsertRowId;
    } catch (error) {
      console.log({ error });
    }
  }

delete(dbClient:DbClient, id: number) {
    const sql = todoSql.delete();
    try {
      //const deleted = 
      dbClient.query(sql, [id]);
      //console.log("deleted : ", deleted);
      const dbchanges = dbClient.changes 
      return dbchanges
    } catch (error) {
      console.log({ error });
    }
  }


  async deleteAll(dbClient:DbClient):Promise<number> {
    const sql = todoSql.deleteAll()
    try { 
      await dbClient.query(sql); 
      return dbClient.changes;
    } catch (error) {
      console.log({ error });
      return -1
    }
  }


  async update(dbClient:DbClient, _id: string, text: string) {
    const sql = todoSql.update();

    try {
      const deleted = await dbClient.query(sql, [text, _id]);
     // console.log("deleted : ", deleted);
      return dbClient.changes;
    } catch (error) {
      console.log({ error });
    }
  }
}

const todoService = new TodoService();
export default todoService;
