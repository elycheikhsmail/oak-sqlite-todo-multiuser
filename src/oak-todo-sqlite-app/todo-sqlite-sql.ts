class TodoSql {
  // tn = tablenale
  tn = "todo_task";

  getAll() {
    let sql = " SELECT * FROM ";
    sql += this.tn;
    sql += " WHERE ";
    sql += " owner_id = ? ";
    return sql;
  }
  getById(){

    let sql = " SELECT * FROM ";
    sql += this.tn;
    sql += " WHERE ";
    sql += " owner_id = ? AND id = ?  ";
    return sql;

  }

  save() {
    let sql = "INSERT INTO ";
    sql += this.tn;
    sql += " ( ";
    sql += " owner_id , text  "; 
    sql += " ) VALUES ";
    sql += " (  ";
    sql += " ? , ? ";
    sql += " ) ";
    return sql;
  }

  delete() {
    let sql = "DELETE FROM ";
    sql += this.tn;
    sql += " WHERE ";
    sql += " id = ? ";
    return sql;
  }
  deleteAll(){

    let sql = "DELETE FROM ";
    sql += this.tn;
    sql += " WHERE ";
    sql += " 1 > 0 ";
    return sql

  }

  update() {
    let sql = "UPDATE ";
    sql += this.tn;
    sql += " SET ";
    sql += " text = ";
    sql += " ? ";
    sql += " WHERE ";
    sql += " id = ? ";
    return sql;
  }
}

const todoSql = new TodoSql();
export default todoSql;
