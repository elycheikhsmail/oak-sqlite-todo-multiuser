import { Context, Status } from "https://deno.land/x/oak@v7.7.0/mod.ts";
// this import must be from url instead of relative path
import { userState } from "../oak-auth-sqlite-app/types.ts";
//import userService from "./user-service.ts";
//import { userState } from "";
import _todoService from "./todo-sqlite-service.ts";

export async function getAllController(ctx: Context) {
  const state = ctx.state as { data: userState }; 
  if (!state.data.isAuth) {
    ctx.response.status = Status.NetworkAuthenticationRequired; 
    ctx.response.body = {
      details: state.data.message,
    };
  } else {
    const getAll = _todoService.getAll(ctx.state.dbClient, state.data.user.id);
    await getAll
      .then((todos) => { 
        ctx.response.body = todos
      })
      .catch((errors) => ctx.response.body = { errors });
  }
}

export async function addController(ctx: Context) {
  const state = ctx.state as { data: userState };
  if (!state.data.isAuth) {
    ctx.response.status = Status.NetworkAuthenticationRequired;
    ctx.response.body = {
      details: state.data.message,
    };
  } else {
    //ctx.response.body = state.data.user;
    //console.log("has body : ",ctx.request.hasBody )
    const dtataPromise = ctx.request.body(); //{ type: 'json' }
    const { text } = await dtataPromise.value;
    // if(!text){ errors }
    //console.log(text)
    ctx.response.body = {
      data: "null",
    };

    const save = _todoService.save(
      ctx.state.dbClient,
      state.data.user.id,
      text,
    );

    await save.then(
      (_dbFeedBack) => { 
        ctx.response.body = {
          id: _dbFeedBack,
          text,
          ownerId: state.data.user.id,
        };
      },
    ).catch(
      (errors) => ctx.response.body = { errors },
    );
  }
}
export async function deleteAll(ctx: Context) {
  console.log("delete all");
  // assgn book id to the params
  const n = await _todoService.deleteAll(ctx.state.dbClient);
  //console.log({ n });
  ctx.response.body = { n };
}

// export async function updateTodo(ctx:Context) {
//         //console.log("has body : ",ctx.request.hasBody )
//         const dtataPromise = ctx.request.body(); //{ type: 'json' }
//         const { text } = await dtataPromise.value;
//         // if(!text){ errors }
//         //console.log(text)
//         ctx.response.body = {
//           data: "null",
//         };

//         if (ctx.params && ctx.params.id) {
//           const update = _todoService.update(ctx.state.dbClient, ctx.params.id, text);
//           //save(text);
//           // assgn book id to the params
//           // const deletee = _todoService.u(ctx.params.id);
//           //const sql = todoSql.deleteByIdSql(parseInt(ctx.params.id));
//           await update
//             .then(
//               (resulet) => {
//                 if (!resulet) ctx.response.body = { message: "task not found" };
//                 else {
//                   //console.log(resulet);
//                   // resulet["affectedRow"] > 1
//                   ctx.response.body = { resulet };
//                 }
//               },
//             ).catch(
//               (errors) => ctx.response.body = { errors },
//             );
//         }
//       }
