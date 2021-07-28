import * as t from "https://deno.land/std@0.102.0/testing/asserts.ts";
//import { delay } from "https://deno.land/std@0.102.0/async/delay.ts";

let todoUrl = "http://localhost:8080";
if (Deno) {
  const u = Deno.env.get("OAK_SQLITE_BASE_URL");
  if (u) todoUrl = u;
}

function getHeaders(token?: string): {
  "Content-Type": string;
  "Access-Control-Allow-Origin": string;
  authorization?: string;
} {
  const headers1 = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  const headers2 = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "authorization": `bearer ${token}`,
  };
  if (token) return headers2;
  else return headers1;
}
interface userInterface {
  username: string;
  password: string;
}
async function register(user: userInterface) {
  const headers = getHeaders();
  const response = await fetch(todoUrl + "/auth/register", {
    method: "POST",
    body: JSON.stringify(user),
    headers: headers,
  });
  const jsonData = await response.json(); 
  return jsonData;
}

async function login(user: userInterface) {
  const headers = getHeaders();
  const response = await fetch(todoUrl + "/auth/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers,
  });
  const jsonData = await response.json();
  return jsonData;
}

export async function add(text: string, token: string) {
  const headers = getHeaders(token);
  const data = { text };
  const response = await fetch(todoUrl + "/api/todos", {
    method: "POST",
    body: JSON.stringify(data),
    headers,
  });
  const jsonData = await response.json();
  //await response.
  return { jsonData };
}
//
export async function getAll(token: string) {
  const headers = getHeaders(token);
  const response = await fetch(todoUrl + "/api/todos", {
    headers,
  });
  const jsonData = await response.json();
  return jsonData;
}
export async function deleteItem(token: string,id:number) {
  const headers = getHeaders(token);
  const response = await fetch(todoUrl + "/api/todos/"+id, {
    method: "DELETE", 
    headers,
  }); 
  const r = response.clone() 
  await r.json(); 
  return r.status
}
Deno.test(
  "auth user can add",
  async () => {
   // await delay(200)
    const r1 = await register({ username: "sidi", password: "1234" });
    localStorage.setItem("token",r1.accessToken)
    
    const r = await add("test1", r1.accessToken);
    
    t.assertEquals(r.jsonData.text, "test1");
  },
);

Deno.test(
  "auth user can add only for him self",
  async () => {
    //await delay(200)
    const r1 = await register({ username: "ely", password: "1234" });
    const r = await add("test2", r1.accessToken); 
    t.assertEquals(r.jsonData.ownerId, 2);
  },
);

Deno.test(
  "auth user can read only his one todo",
  async () => {
    //await delay(200)
    const r1 = await login({ username: "sidi", password: "1234" });
    const r = await getAll(r1.accessToken);
    t.assertEquals(r[0].owner_id, 1);
  },
);

Deno.test(
  "auth user can delete only his own todos",
  async () => {
    //await delay(200)
    const token = localStorage.getItem("token")
    const s = await deleteItem(String(token),2); 
    t.assertEquals(s,401) 
  },
);
