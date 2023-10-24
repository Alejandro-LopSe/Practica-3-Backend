import { Location } from "../mongo/types.ts";
import { LocationCollection } from "../mongo/db.ts";



export const  filterlocation_type =async (_type: string): Promise<Location[]> => {
    

    try{

        const existe: Location[] = await LocationCollection.find({type: _type}).toArray()

        return existe

    }catch(error){
        console.log(error)
        return error
        
    }

}
export const  filterlocation_dimension =async (_dimension: string): Promise<Location[]> => {
    

    try{

        const existe: Location[] = await LocationCollection.find({dimension: _dimension}).toArray()

        if(existe.length===0){
            throw Error("No se ha encontrado ninguno, o se ha introducido mal el cmapo")
        }
        return existe

    }catch(error){
        console.log(error)
        return error.message
        
    }

}