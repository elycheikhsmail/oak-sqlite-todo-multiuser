import { Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { Context, Status } from "https://deno.land/x/oak@v7.7.0/mod.ts";

import { userState } from "../oak-auth-sqlite-app/types.ts";
// this import must be from url instead of relative path
//import { userState } from "../oak-auth-sqlite-app/types.ts";
//import userService from "./user-service.ts";
//import { userState } from "";
import _todoService from "./todo-sqlite-service.ts";
import {
  addController,
  deleteAll,
  getAllController,
} from "./todo-controller.ts";

const router = new Router();

// router.get("/", (ctx) => {
//   ctx.response.body = { msg: "Hello world!" };
// });

router.delete("/dd", async (ctx: Context) => await deleteAll(ctx));

router.get("/", async (ctx: Context) => await getAllController(ctx));

router.post("/", async (ctx: Context) => await addController(ctx));

router.delete("/:id", (ctx: Context) => {
  const state = ctx.state as { data: userState };
  console.log(state.data.user)
  if (!state.data.isAuth) {
    ctx.response.status = Status.NetworkAuthenticationRequired;
    ctx.response.body = {
      details: "not auth user",
    };
  } else {
    const pathname = ctx.request.url.pathname;
    const list = pathname.split("/"); 
    const id1 = list.at(-1); 
    // verifier the type od id
    const id = parseInt(String(id1));
    console.log({id})
    // verify that item exist in db or 404
    const todos = _todoService.getById(
      ctx.state.dbClient,
      state.data.user.id,
      id,
    );
    console.log({todos})
    if (todos.length == 0) {
      ctx.response.status = Status.Unauthorized;
      ctx.response.body = {
        details: "not found",
      };
    } else {
      // delete item
      _todoService.delete(ctx.state.dbClient, id);
      ctx.response.status = Status.OK;
      ctx.response.body = {
        details: "task done",
      };
    }
  }
});

// router.get('/port',(ctx) => {ctx.response.body = {PORT:Deno.env.get("PORT")||"no port in env var"} }
// )
export { router as todoRouters };
