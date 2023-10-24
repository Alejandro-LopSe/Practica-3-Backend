import { MongoClient, Database } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { Character,Location } from "./types.ts";


const connectMongoDB = async (): Promise<Database> => {


  try{

    const mongo_url = `mongodb+srv://Arquitectura:a@cluster0.jnozffu.mongodb.net/Practicas?authMechanism=SCRAM-SHA-1`;

    const client = new MongoClient();
    await client.connect(mongo_url);
  
    const db = client.database("Practicas");
    return db;

  }catch(error){
    
    console.log(error)
    return error
  }
  
};

const db = await connectMongoDB();
console.info(`MongoDB ${db.name} connected`);

export const CharacterCollection = db.collection<Character>("Character")
export const LocationCollection = db.collection<Location>("Location")