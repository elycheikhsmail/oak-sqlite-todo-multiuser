- deps and types shared from url to be easy to copy pass in differant places and easy maintenability
oak-sqlite-auth-deps
oak-sqlite-auth-func
oak-todo-types

- [x] proctected don't depend on auth-app
- [x] link todo to a specific user (owner_id) in db => rebuild tables, constaint in ts validation and not in sql statement
- [x] protected /api/todo POST
- [x] read id from ctx.state
- [x] use it in todoService and todoSql
- logger show endpoit request and method used
- protect all todo api endpoints
- separate controller from route when possible
- test automatic behind doc rest api
 
// rename it to the name in env var

 - [x] test auth user can add todo and todo.owner_id=user.id
 - [x] test auth user can read only his todos
 -  test auth user can delete only his todo 

 - test non auth user can't add todo
 - test non auth user can't read todos
  - test non auth user can't  delete todo
- when tested is ok remove console.log 

- web ui + oak backend+worker
read run.json
expose script in ui like this
alias xx
command yyy
button for running this command 
in background oak hettp server recive command alias
and tel worker to do the job and give feedback to oak 
then ok give feedback to browser using ws

