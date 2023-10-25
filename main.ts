// deno-lint-ignore-file
// deno-lint-ignore-file no-unused-vars
import express, {Response,Request} from "npm:express@4.18.2";
import { getcharacter} from "./resolvers/Getcharacter.ts";
import { getcharacters } from "./resolvers/Getcharacters.ts";
import { Character, Location } from "./mongo/types.ts";
import { getlocation } from "./resolvers/Getlocation.ts";
import { getlocations } from "./resolvers/Getlocations.ts"
import { filtercharacter_gender,filtercharacter_status } from "./resolvers/Filtercharacters.ts";
import { filterlocation_dimension,filterlocation_type } from "./resolvers/Filterlocations.ts";
import { format } from "./funciones%20extra/funciones.ts";
import { deletecharacter, deletelocation } from "./resolvers/delete.ts";




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

  if(params && isNaN(parseInt(params))){
    res.status(400).send("la pagina no es un numero")
    return
  }

  const data: Character[] = await getcharacters(params)

  res.status(200).send(data)
  console.log("\Busqueda Finalizada correctamente\n");
}catch(error){
  
  console.log(error);
  res.status(400).send(error)
}

}).get("/character/:id?",async (req: Request, res: Response)=>{

  try{
    const params: string = req.params.id;
    
    if(!params){
      res.status(400).send("Falta id.")
      return
    }else if(isNaN(parseInt(params))){
      res.status(400).send("El id no es un numero")
      return
    }

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

  if(params && isNaN(parseInt(params))){
    res.status(400).send("la pagina no es un numero")
    return
  }


  const data: Character[] = await getlocations(params)

  res.status(200).send(data)
  console.log("\Busqueda Finalizada correctamente\n");
}catch(error){
  
  console.log(error);
  res.status(400).send(error)
}

}).get("/location/:id?",async (req: Request, res: Response)=>{

  try{
    const params: string = req.params.id;
  
    if(!params){
      res.status(400).send("Falta id.")
      return
    }else if(isNaN(parseInt(params))){
      res.status(400).send("El id no es un numero")
      return
    }

    const data: Character = await getlocation(params)
  
    res.status(200).send(data)
    console.log("\Busqueda Finalizada correctamente\n");
  
  }catch(error){
  
    res.status(400).send(error.message)
    console.log(error);
    
  }

}).get("/filtergender/:genre?",async (req: Request, res: Response) => {
  
  try{

    const  params: string | undefined = format(req.params.genre);

    var s:string = `Filtro por genre: ${params}`

    if(!req.params.genre){
      s=`Sin filtro genre, mostrando todas las opciones`    
    }

    const data: Character[] = await filtercharacter_gender(params)
  
    res.status(200).send(data)
    console.log("\n"+s);
  
  }catch(error){
  
    res.status(400).send(error.message)
    console.log(error);
    
  }
}).get("/filterstatus/:status?",async (req: Request, res: Response) => {
  
  try{
    const  params: string | undefined = format(req.params.status);

    var s:string = `Filtro por status: ${params}`

    if(!req.params.status){
      s=`Sin filtro status, mostrando todas las opciones`    
    }
  
    const data: Character[] = await filtercharacter_status(params)
  
    res.status(200).send(data)
    console.log("\n"+s);
  
  }catch(error){
  
    res.status(400).send(error.message)
    console.log(error);
    
  }
}).get("/filterdimension/:dimension?",async (req: Request, res: Response) => {
  
  try{
    const  params: string | undefined = req.params.dimension;

    var s:string = `Filtro por dimension: ${params}`

    if(!req.params.dimension){
      s=`Sin filtro dimension, mostrando todas las opciones`    
    }
  
    const data: Location[] = await filterlocation_dimension(params)
  
    res.status(200).send(data)
    console.log("\n"+s);
  
  }catch(error){
  
    res.status(400).send(error.message)
    console.log(error);
    
  }
}).get("/filtertype/:type?",async (req: Request, res: Response) => {
  
  try{
    const  params: string | undefined = format(req.params.status);

    var s:string = `Filtro por type: ${params}`

    if(!req.params.type){
      s=`Sin filtro type, mostrando todas las opciones`    
    }
  
    const data: Location[] = await filterlocation_type(params)
  
    res.status(200).send(data)
    console.log("\Busqueda Finalizada correctamente\n");
  
  }catch(error){
  
    res.status(400).send(error.message)
    console.log(error);
    
  }
})
//*******************************USAR CON POSTMAN*****************************************
.delete("/deletecharacter/:id?",async (req: Request, res: Response)=>{

  try{
    const params: string = req.params.id;
    
    if(!params){
      res.status(400).send("Falta id.")
      return
    }else if(isNaN(parseInt(params))){
      res.status(400).send("El id no es un numero")
      return
    }

     const data: string = await deletecharacter(params)

    res.status(200).send(data)

  }catch(error){

    res.status(400).send(error.message)
    console.log(error);
  
  }
})
.delete("/deletelocation/:id?",async (req: Request, res: Response)=>{

  try{
    const params: string = req.params.id;
    
    if(!params){
      res.status(400).send("Falta id.")
      return
    }else if(isNaN(parseInt(params))){
      res.status(400).send("El id no es un numero")
      return
    }

     const data: string = await deletelocation(params)

    res.status(200).send(data)

  }catch(error){

    res.status(400).send(error.message)
    console.log(error);
  
  }
})
//*******************************USAR EN CASO DE NO TENER POSTMAN U OTRO PROGRAMA DE FRONTEND PARA APIS*********************************
//(usar get en este caso no es correcto solo es para que se pueda comprobar el ejercicio)
.get("/deletecharacter/:id?",async (req: Request, res: Response)=>{

  try{
    const params: string = req.params.id;
    
    if(!params){
      res.status(400).send("Falta id.")
      return
    }else if(isNaN(parseInt(params))){
      res.status(400).send("El id no es un numero")
      return
    }

     const data: string = await deletecharacter(params)

    res.status(200).send(data)

  }catch(error){

    res.status(400).send(error.message)
    console.log(error);
  
  }
})
.get("/deletelocation/:id?",async (req: Request, res: Response)=>{

  try{
    const params: string = req.params.id;
    
    if(!params){
      res.status(400).send("Falta id.")
      return
    }else if(isNaN(parseInt(params))){
      res.status(400).send("El id no es un numero")
      return
    }

     const data: string = await deletelocation(params)

    res.status(200).send(data)

  }catch(error){

    res.status(400).send(error.message)
    console.log(error);
  
  }
})

app.listen(8000, () => {
  console.log("Server is running on port 8000\n");
});