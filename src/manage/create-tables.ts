import { DB } from "https://deno.land/x/sqlite@v2.4.2/mod.ts";
 
export   function readFile(path:string) {
    const decoder = new TextDecoder("utf8");
    const data =  Deno.readFileSync(path);
    const text = String(decoder.decode(data));
    return text
}

export  function createTables(dbClient:DB,path: string) {
  const decoder = new TextDecoder("utf8");
  const data = Deno.readFileSync(path);
  const text = String(decoder.decode(data));
  const lst = text.split(";")
  lst.forEach(

      (text)  => {
          console.log({text})
          if(text) dbClient.query(text)
          

        }
  )  
}
 

