import { app } from "./add-middlware.ts";
//
import todoRouters from "./../oak-todo-sqlite-app/mod.ts"; 
app.use(
  todoRouters
    .prefix("/api/todos")
    .routes(),
);
app.use(todoRouters.allowedMethods());
//
import todoUI from "./../oak-todo-static-app/mod.ts";

app.use(todoUI.allowedMethods());
app.use(
  todoUI
    .prefix("/")
    .routes(),
);
// 
import  authRouter from "../oak-auth-sqlite-app/mod.ts";
app.use(authRouter.allowedMethods());
app.use(
  authRouter
    .prefix("/auth")
    .routes(),
);

export { app };
