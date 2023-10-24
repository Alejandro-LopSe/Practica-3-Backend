// deno-lint-ignore-file no-unused-vars
import express, {Response,Request} from "npm:express@4.18.2";
import { getcharacter} from "./resolvers/Getcharacter.ts";
import { getcharacters } from "./resolvers/Getcharacters.ts";
import { Character, Location } from "./mongo/types.ts";
import { getlocation } from "./resolvers/Getlocation.ts";
import { getlocations } from "./resolvers/Getlocations.ts"
import { filtercharacter_gender,filtercharacter_status } from "./resolvers/Filtercharacters.ts";
import { filterlocation_dimension,filterlocation_type } from "./resolvers/Filterlocations.ts";




const app = express();


app.get("/", (req:Request,res:Response) => {
  res.send(`
  Enlaces posibles:<br><br>
  /multiple_characters/:page   (page, optional)
  <br><br>
  /character/:id  (use "remove" to remove all characters from database)
  <br><br>
  /multiple_locations/:page   (page, optional)
  <br><br>
  /location/:id   (use "remove" to remove all characters from database)
  <br><br>
  /filtergenre/:genre
  <br><br>
  /filterdimension/:dimension
  <br><br>
  /filtertype/:type`);
}).get("/multiple_characters/:page?",async (req: Request, res: Response)=>{

  try{
  const params: string = req.params.page;

  const data: Character[] = await getcharacters(params)

  res.status(200).send(data)
  console.log("\Busqueda Finalizada correctamente\n");
}catch(error){
  
  console.log(error);
  res.status(400).send(error)
}

}).get("/character/:id",async (req: Request, res: Response)=>{

  try{
    const params: string = req.params.id;

    const data: Character = await getcharacter(params)

    res.status(200).send(data)
    console.log("\Busqueda Finalizada correctamente\n");

  }catch(error){

    res.status(400).send(error.message)
    console.log(error);
  
  }
}).get("/multiple_locations/:page?",async (req: Request, res: Response)=>{

  try{
  const params: string = req.params.page;

  const data: Character[] = await getlocations(params)

  res.status(200).send(data)
  console.log("\Busqueda Finalizada correctamente\n");
}catch(error){
  
  console.log(error);
  res.status(400).send(error)
}

}).get("/location/:id",async (req: Request, res: Response)=>{

  try{
    const params: string = req.params.id;
  
    const data: Character = await getlocation(params)
  
    res.status(200).send(data)
    console.log("\Busqueda Finalizada correctamente\n");
  
  }catch(error){
  
    res.status(400).send(error.message)
    console.log(error);
    
  }

}).get("/filtergenre/:genre",async (req: Request, res: Response) => {
  
  try{
    const params: string = req.params.genre;
  
    const data: Character[] = await filtercharacter_gender(params)
  
    res.status(200).send(data)
    console.log("\Busqueda Finalizada correctamente\n");
  
  }catch(error){
  
    res.status(400).send(error.message)
    console.log(error);
    
  }
}).get("/filterstatus/:status",async (req: Request, res: Response) => {
  
  try{
    const params: string = req.params.status;
  
    const data: Character[] = await filtercharacter_status(params)
  
    res.status(200).send(data)
    console.log("\Busqueda Finalizada correctamente\n");
  
  }catch(error){
  
    res.status(400).send(error.message)
    console.log(error);
    
  }
}).get("/filterdimension/:dimension",async (req: Request, res: Response) => {
  
  try{
    const params: string = req.params.dimension;
  
    const data: Location[] = await filterlocation_dimension(params)
  
    res.status(200).send(data)
    console.log("\Busqueda Finalizada correctamente\n");
  
  }catch(error){
  
    res.status(400).send(error.message)
    console.log(error);
    
  }
}).get("/filtertype/:type",async (req: Request, res: Response) => {
  
  try{
    const params: string = req.params.type;
  
    const data: Location[] = await filterlocation_type(params)
  
    res.status(200).send(data)
    console.log("\Busqueda Finalizada correctamente\n");
  
  }catch(error){
  
    res.status(400).send(error.message)
    console.log(error);
    
  }
})

app.listen(8000, () => {
  console.log("Server is running on port 8000\n");
});