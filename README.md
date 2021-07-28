# oak-sqlite-simple-todo
in this example you will see : <br>
- how serve static site in given directory using oak <br>
- how config db connexion (sqlite as example) in scalable way <br>
- retrive data from posted data <br>
- respond to user request with json data <br>
- and more
# requirement
deno cli installed
# init db
you need to create table by running
```
deno run --allow-all cli.ts
```
# how to use 
init db (only one time) <br>

just clone this reposetory in you local machine and run this <br>
```
deno run --allow-all run.ts
```
then open todo app in browser  <br>
http://localhost:8080/ <br>
you will see screen like this:<br>
<image src="./src/oak-simpletodo.png"> <br>
 then you can inteact with todo using this inteface.<br>

 # run deno test for this project on linux and mac
in terminal
```
export OAK_SQLITE_FILE=_testdb.db 
deno run --allow-all cli.ts
deno run --allow-all run.ts
```
open new tab in your terminal and run
```
 cd src && deno test --allow-all   tests/api.test.ts
```

 # run deno test for this project on winows
in terminal
```
set OAK_SQLITE_FILE=_testdb.db 
deno run --allow-all run.ts
deno run --allow-all run.ts
```
open new tab in your terminal and run
```
 cd src && deno test --allow-all   tests/api.test.ts
```


# automatic test running in brwser
read ./client-test/readme.md
<hr />
<image src="./client-test/oak-fetch-bowser-test.png">

# inspiration 
this project try to port best pratic and philosophie in django/flask/foalts framework to oak in progress 

# limittion
sqlite can't be out side src directory